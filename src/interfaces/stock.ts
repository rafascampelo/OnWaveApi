export interface CreateStockMovementBody {
  quantity: number;
  description?: string | null;
}

export interface CreateStockMovement extends CreateStockMovementBody {
  productId: string;
  userId: string;
}

export interface CreateStockMovementPrisma extends CreateStockMovement {
  movementType: string;
}

export interface StockMovement extends CreateStockMovementPrisma {
  id: string;
  date: Date;
}

export interface StockMovementsRepository {
  create(data: CreateStockMovementPrisma): Promise<null | StockMovement>;
  getAll(productId: string): Promise<null | StockMovement[]>;
  getById(id: string): Promise<null | StockMovement>;
}
