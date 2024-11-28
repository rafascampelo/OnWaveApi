import { prisma } from "../database/prisma-client";
import { UserRepository, User, CreateUser } from "../interfaces/user";

export class UserRepositoryPrisma implements UserRepository {
  async createUser(data: CreateUser): Promise<null | User> {
    const {
      firstname,
      lastname,
      email,
      password,
      barbershopId,
      cellphone,
      role,
      fixedPayment,
      commissionProcedure,
      commissionProduct,
      adminId,
      firstLogin,
    } = data;

    if (!password) return null;

    return await prisma.users.create({
      data: {
        firstname,
        lastname,
        email,
        password,
        cellphone,
        role,
        fixedPayment,
        commissionProcedure,
        commissionProduct,
        adminId,
        barbershopId,
        firstLogin,
      },
    });
  }

  async getByBarbershopId(id: string): Promise<null | User[]> {
    return await prisma.users.findMany({
      where: {
        barbershopId: id,
      },
      orderBy: {
        firstname: "asc",
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
          { firstname: { contains: value } },
          { lastname: { contains: value } },
        ],
      },
      orderBy: {
        firstname: "asc",
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

  async updateFirstLogin(data: {
    id: string;
    value: boolean;
  }): Promise<null | User> {
    const { id, value } = data;

    return await prisma.users.update({
      where: {
        id,
      },
      data: {
        firstLogin: value,
      },
    });
  }

  async updateCommissionProcedure(data: {
    id: string;
    value: number;
  }): Promise<null | User> {
    const { id, value } = data;

    return await prisma.users.update({
      where: { id },
      data: {
        commissionProcedure: value,
      },
    });
  }

  async updateCommissionProduct(data: {
    id: string;
    value: number;
  }): Promise<null | User> {
    const { id, value } = data;

    return await prisma.users.update({
      where: { id },
      data: {
        commissionProduct: value,
      },
    });
  }

  async updateFixedPayment(data: {
    id: string;
    value: number;
  }): Promise<null | User> {
    const { id, value } = data;

    return await prisma.users.update({
      where: { id },
      data: {
        fixedPayment: value,
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
