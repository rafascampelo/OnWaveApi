import { prisma } from "../database/prisma-client";
import {
   Barbershop,
   BarbershopRepository,
   CreateBarbershop,
} from "../interfaces/barbershop";

export class BarbershopRepositoryPrisma implements BarbershopRepository {
   async create(data: CreateBarbershop): Promise<null | Barbershop> {
      const { name,addressId } = data;
      return await prisma.barbershops.create({
         data: {
            name,
            addressId,
         },
      });
   }

   async getAll(): Promise<null | Barbershop[]> {
      return prisma.barbershops.findMany();
   }

   async getByName(name: string): Promise<null | Barbershop[]> {
      return await prisma.barbershops.findMany({
         where: {
            name: { contains: name },
         },
         orderBy: {
            name: "asc",
         },
      });
   }

   async getById(id: string): Promise<null | Barbershop> {
      return await prisma.barbershops.findUnique({
         where: {
            id,
         },
      });
   }

   async delete(id: string): Promise<null | Barbershop> {
      return await prisma.barbershops.delete({
         where: {
            id,
         },
      });
   }
}
