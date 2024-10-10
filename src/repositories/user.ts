import { prisma } from "../database/prisma-client";
import {
  CreateDev,
  UserRepository,
  User,
  CreateUser,
} from "../interfaces/user";

export class UserRepositoryPrisma implements UserRepository {
  async createUser(data: CreateUser): Promise<null | User> {
    const {
      firstName,
      lastName,
      email,
      password,
      barbeshopId,
      born,
      cellphone,
      cpf,
      role,
      unitId,
      adminId,
    } = data;

    return await prisma.users.create({
      data: {
        firstName,
        lastName,
        email,
        password,
        role,
        barbeshopId,
        born,
        cellphone,
        cpf,
        unitId,
        adminId,
      },
    });
  }

  async createDev(data: CreateDev): Promise<null | User> {
    const { firstName, lastName, email, password } = data;

    return await prisma.users.create({
      data: {
        firstName,
        lastName,
        email,
        password,
        role: "DEV",
      },
    });
  }

  async getByBarbershopId(id: string): Promise<null | User[]> {
    return await prisma.users.findMany({
      where: {
        barbeshopId: id,
      },
      orderBy: {
        firstName: "asc",
      },
    });
  }

  async getByEmail(email: string): Promise<null | User> {
    return await prisma.users.findUnique({
      where: {
        email,
      },
    });
  }

  async getById(id: string): Promise<null | User> {
    return await prisma.users.findUnique({
      where: {
        id,
      },
    });
  }

  async getByName(value: string): Promise<null | User[]> {
    return await prisma.users.findMany({
      where: {
        OR: [
          { firstName: { contains: value } },
          { lastName: { contains: value } },
        ],
      },
      orderBy: {
        firstName: "asc",
      },
    });
  }

  async getEmployess(id: string): Promise<null | User[]> {
    return await prisma.users.findMany({
      where: { adminId: id },
    });
  }

  async getUsers(): Promise<null | User[]> {
    return await prisma.users.findMany();
  }

  async updateCellphone(data: {
    id: string;
    value: string;
  }): Promise<null | User> {
    const { id, value } = data;

    return await prisma.users.update({
      where: { id },
      data: {
        cellphone: value,
      },
    });
  }

  async updatePassword(data: {
    id: string;
    value: string;
  }): Promise<null | User> {
    const { id, value } = data;

    return await prisma.users.update({
      where: {
        id,
      },
      data: {
        password: value,
      },
    });
  }

  async delete(id: string): Promise<null | User> {
    return await prisma.users.delete({
      where: {
        id,
      },
    });
  }
}
