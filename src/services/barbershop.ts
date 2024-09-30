import { Barbershop } from "@prisma/client";
import { BarbershopRepositoryPrisma } from "../repositories/barbershop";

export class BarbershopServices {
   private barbershopReposotory;

   constructor() {
      this.barbershopReposotory = new BarbershopRepositoryPrisma();
   }

   async create(name: string): Promise<null | Barbershop> {
      return await this.barbershopReposotory.create({ name });
   }

   async getAll(): Promise<null | Barbershop[]> {
      return await this.barbershopReposotory.getAll();
   }

   async getById(id: string): Promise<null | Barbershop> {
      return await this.barbershopReposotory.getById(id);
   }

   async find(name: string): Promise<null | Barbershop[]> {
      return await this.barbershopReposotory.getByName(name);
   }

   async delete(id: string): Promise<null | Barbershop> {
      return await this.barbershopReposotory.delete(id);
   }
}
