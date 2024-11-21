import { prisma } from "../database/prisma-client";
import {
  Category,
  CategoryRepository,
  CreateCategoryPrisma,
} from "../interfaces/category";

export class CategoryRepositoryPrisma implements CategoryRepository {
  async create(data: CreateCategoryPrisma): Promise<null | Category> {
    const { name, barbershopId } = data;

    return await prisma.categories.create({
      data: {
        name,
        barbershopId,
      },
    });
  }

  async getAll(data: { barbershopId: string }): Promise<Category[]> {
    const { barbershopId } = data;

    return await prisma.categories.findMany({
      where: {
        barbershopId,
      },
    });
  }

  async getById(id: string): Promise<null | Category> {
    return await prisma.categories.findUnique({
      where: {
        id,
      },
    });
  }

  async updateName(data: {
    id: string;
    value: string;
  }): Promise<null | Category> {
    const { id, value } = data;

    return await prisma.categories.update({
      where: {
        id,
      },
      data: {
        name: value,
      },
    });
  }

  async delete(id: string): Promise<null | Category> {
    return await prisma.categories.delete({
      where: {
        id,
      },
    });
  }
}
