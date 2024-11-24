import { Product } from "../interfaces/product";
import { CreateStockMovement, StockMovement } from "../interfaces/stock";
import { StockMovementsRepositoryPrisma } from "../repositories/stock";
import { ProductServices } from "./product";

export class StockMovementServices {
  private stockmovementsRepository;
  private productServices;

  constructor() {
    this.stockmovementsRepository = new StockMovementsRepositoryPrisma();
    this.productServices = new ProductServices();
  }

  async stockIn(
    data: CreateStockMovement
  ): Promise<null | { product: Product; stockMovement: StockMovement }> {
    const { quantity, userId, description, productId } = data;

    const product = await this.productServices.updateStock({
      id: productId,
      value: Number(quantity),
    });

    if (!product) return null;

    const stockMovement = await this.stockmovementsRepository.create({
      movementType: "IN",
      userId,
      productId,
      quantity: Number(quantity),
      description,
    });

    if (!stockMovement) return null;

    return { product, stockMovement };
  }

  async stockOut(
    data: CreateStockMovement
  ): Promise<null | { product: Product; stockMovement: StockMovement }> {
    const { quantity, userId, description, productId } = data;

    const value = Number(quantity - quantity - quantity);

    const product = await this.productServices.updateStock({
      id: productId,
      value,
    });

    if (!product) return null;

    const stockMovement = await this.stockmovementsRepository.create({
      movementType: "OUT",
      userId,
      productId,
      quantity: Number(quantity),
      description,
    });

    if (!stockMovement) return null;

    return { product, stockMovement };
  }

  async getAll(productId: string): Promise<null | StockMovement[]> {
    return await this.stockmovementsRepository.getAll(productId);
  }

  async getById(id: string): Promise<null | StockMovement> {
    return await this.stockmovementsRepository.getById(id);
  }
}
