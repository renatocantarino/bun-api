import type { Request, Response } from 'express';
import { prisma } from '../core/prisma';

export const CreateTodoController = async (
  request: Request,
  response: Response
) => {
  const userId = request.headers['x-user-id'];

  if (!userId) {
    response.sendStatus(403).send({
      error: 'userId not found in request',
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      Id: userId as string,
    },
  });

  if (!user) {
    response.sendStatus(404).send({
      error: 'user  not found',
    });
  }

  const { title, description } = request.body;

  const todoCreated = await prisma.todos.create({
    data: {
      Title: title,
      Description: description,
      ownerId: user?.Id!,
    },
  });

  return response.json(todoCreated);
};
