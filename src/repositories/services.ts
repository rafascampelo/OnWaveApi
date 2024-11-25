import { prisma } from "../database/prisma-client";
import {
  CreateServicesPrisma,
  Services,
  ServicesRepository,
} from "../interfaces/services";

export class ServicesRepositoryPrisma implements ServicesRepository {
  async create(data: CreateServicesPrisma): Promise<null | Services> {
    const {
      barbershopId,
      clientName,
      price,
      procedures,
      products,
      status,
      userId,
    } = data;

    return await prisma.services.create({
      data: {
        clientName,
        price,
        status,
        barbershopId,
        userId,
        procedures: {
          create: data.procedures.map((procedure) => ({
            procedureId: procedure.procedureId,
          })),
        },
        products: {
          create: data.products.map((product) => ({
            productId: product.productId,
          })),
        },
      },
    });
  }
}
