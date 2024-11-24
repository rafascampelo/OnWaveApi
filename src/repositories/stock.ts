import { prisma } from "../database/prisma-client";
import {
  CreateStockMovementPrisma,
  StockMovement,
  StockMovementsRepository,
} from "../interfaces/stock";

export class StockMovementsRepositoryPrisma
  implements StockMovementsRepository
{
  async create(data: CreateStockMovementPrisma): Promise<null | StockMovement> {
    const { movementType, productId, quantity, description, userId } = data;

    return await prisma.stockMovements.create({
      data: {
        userId,
        movementType,
        quantity,
        productId,
        description,
      },
    });
  }

  async getAll(productId: string): Promise<null | StockMovement[]> {
    return await prisma.stockMovements.findMany({
      where: { productId },
    });
  }

  async getById(id: string): Promise<null | StockMovement> {
    return await prisma.stockMovements.findUnique({
      where: { id: id },
    });
  }
}
