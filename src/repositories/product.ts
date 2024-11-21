import { prisma } from "../database/prisma-client";
import {
  CreateProductPrisma,
  Product,
  ProductRepository,
} from "../interfaces/product";

export class ProductRepositoryPrisma implements ProductRepository {
  async create(data: CreateProductPrisma): Promise<null | Product> {
    const {
      barbershopId,
      cost,
      name,
      nameWeight,
      price,
      weight,
      workTop,
      describe,
      stock,
      categoryId,
    } = data;


    return await prisma.products.create({
      data: {
        name,
        weight,
        nameWeight,
        cost,
        price,
        describe,
        workTop,
        stock,
        barbershopId,
        categoryId,
      },
    });
  }

  async getAll(barbershopId: string): Promise<null | Product[]> {
    return await prisma.products.findMany({
      where:{
        barbershopId
      }
    });
  }

  async getByName(data: {
    barbershopId: string;
    name: string;
  }): Promise<null | Product[]> {
    const { barbershopId, name } = data;
    return await prisma.products.findMany({
      where: {
        AND: [{ barbershopId }, { name: { contains: name } }],
      },
      orderBy: {
        name: "asc",
      },
    });
  }

  async getById(id: string): Promise<null | Product> {
    return await prisma.products.findUnique({
      where: {
        id,
      },
    });
  }

  async updateName(data: {
    id: string;
    value: string;
  }): Promise<null | Product> {
    const { id, value } = data;

    return await prisma.products.update({
      where: {
        id,
      },
      data: {
        name: value,
      },
    });
  }

  async updateNameWeight(data: {
    id: string;
    value: string;
  }): Promise<null | Product> {
    const { id, value } = data;

    return await prisma.products.update({
      where: {
        id,
      },
      data: {
        nameWeight: value,
      },
    });
  }

  async updateDescribe(data: {
    id: string;
    value: string;
  }): Promise<null | Product> {
    const { id, value } = data;

    return await prisma.products.update({
      where: {
        id,
      },
      data: {
        describe: value,
      },
    });
  }

  async updateWeight(data: {
    id: string;
    value: number;
  }): Promise<null | Product> {
    const { id, value } = data;

    return await prisma.products.update({
      where: {
        id,
      },
      data: {
        weight: value,
      },
    });
  }

  async updatePrice(data: {
    id: string;
    value: number;
  }): Promise<null | Product> {
    const { id, value } = data;

    return await prisma.products.update({
      where: {
        id,
      },
      data: {
        price: value,
      },
    });
  }

  async updateCost(data: {
    id: string;
    value: number;
  }): Promise<null | Product> {
    const { id, value } = data;

    return await prisma.products.update({
      where: {
        id,
      },
      data: {
        cost: value,
      },
    });
  }

  async updateWorktop(data: {
    id: string;
    value: boolean;
  }): Promise<null | Product> {
    const { id, value } = data;

    return await prisma.products.update({
      where: {
        id,
      },
      data: {
        workTop: value,
      },
    });
  }

  async delete(id: string): Promise<null | Product> {
    return await prisma.products.delete({
      where: {
        id,
      },
    });
  }
}
