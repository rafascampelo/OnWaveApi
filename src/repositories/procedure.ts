import { prisma } from "../database/prisma-client";
import {
  CreateProcedurePrisma,
  Procedure,
  ProcedureRepository,
} from "../interfaces/procedure";

export class ProcedureRepositoryPrisma implements ProcedureRepository {
  async create(data: CreateProcedurePrisma): Promise<null | Procedure> {
    const { barbershopId, categoryId, cost, name, price, describe } = data;

    return await prisma.procedures.create({
      data: {
        cost,
        describe,
        name,
        price,
        barbershopId,
        categoryId,
      },
    });
  }

  async getAll(barbershopId: string): Promise<null | Procedure[]> {
    return await prisma.procedures.findMany({
      where: {
        barbershopId,
      },
    });
  }

  async getById(id: string): Promise<null | Procedure> {
    return await prisma.procedures.findUnique({
      where: {
        id,
      },
    });
  }

  async getByName(data: {
    barbershopId: string;
    name: string;
  }): Promise<null | Procedure[]> {
    const { barbershopId, name } = data;

    return await prisma.procedures.findMany({
      where: {
        AND: [{ barbershopId, name }],
      },
      orderBy: {
        name: "asc",
      },
    });
  }

  async updateCost(data: {
    id: string;
    value: number;
  }): Promise<null | Procedure> {
    const { id, value } = data;

    return await prisma.procedures.update({
      where: {
        id,
      },
      data: {
        cost: value,
      },
    });
  }

  async updateDescribe(data: {
    id: string;
    value: string;
  }): Promise<null | Procedure> {
    const { id, value } = data;

    return await prisma.procedures.update({
      where: { id },
      data: { describe: value },
    });
  }

  async updateName(data: {
    id: string;
    value: string;
  }): Promise<null | Procedure> {
    const { id, value } = data;

    return await prisma.procedures.update({
      where: { id },
      data: { name: value },
    });
  }

  async updatePrice(data: {
    id: string;
    value: number;
  }): Promise<null | Procedure> {
    const { id, value } = data;

    return await prisma.procedures.update({
      where: { id },
      data: { price: value },
    });
  }

  async delete(id: string): Promise<null | Procedure> {
    return await prisma.procedures.delete({
      where: { id },
    });
  }
}
