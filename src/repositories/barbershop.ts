import { prisma } from "../database/prisma-client";
import {
   Barbershop,
   BarbershopRepository,
   CreateBarbershop,
} from "../interfaces/barbershop";

export class BarbershopRepositoryPrisma implements BarbershopRepository {
   async create(data: CreateBarbershop): Promise<null | Barbershop> {
      const { name } = data;
      return await prisma.barbershop.create({
         data: {
            name,
         },
      });
   }

   async getAll(): Promise<null | Barbershop[]> {
      return prisma.barbershop.findMany();
   }

   async getByName(name: string): Promise<null | Barbershop[]> {
      return await prisma.barbershop.findMany({
         where: {
            name: { contains: name },
         },
         orderBy: {
            name: "asc",
         },
      });
   }

   async getById(id: string): Promise<null | Barbershop> {
      return await prisma.barbershop.findUnique({
         where: {
            id,
         },
      });
   }

   async delete(id: string): Promise<null | Barbershop> {
      return await prisma.barbershop.delete({
         where: {
            id,
         },
      });
   }
}
