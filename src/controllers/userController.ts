import type { Request, Response } from 'express';
import { prisma } from '../core/prisma';

export const UserController = async (request: Request, response: Response) => {
  const users = await prisma.user.findMany({
    select: {
      Id: true,
      Name: true,
      Email: true,
    },
  });

  response.json(users);
};

export const FindUserByIdController = async (
  request: Request,
  response: Response
) => {
  const { UserId } = request.params;
  const user = await prisma.user.findUnique({
    where: {
      Id: UserId,
    },
  });

  if (!user) {
    return response.sendStatus(404);
  }

  response.json(user);
};

export const CreateUserController = async (
  request: Request,
  response: Response
) => {
  const { name, email } = request.body;

  const userAlreadyExists = await prisma.user.findUnique({
    where: {
      Email: email,
    },
    select: {
      Id: true,
    },
  });

  if (userAlreadyExists) {
    return response.sendStatus(400).send({
      error: 'User already exists',
    });
  }

  const userCreated = await prisma.user.create({
    data: {
      Name: name,
      Email: email,
    },
  });

  return response.json(userCreated);
};
