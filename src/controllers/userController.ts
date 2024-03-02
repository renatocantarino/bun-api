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

  response.json(user);
};
