export interface CreateProduct {
  name: string;
  weight: number;
  nameWeight: string;
  cost: number;
  price?: number | null;
  describe?: string | null;
  workTop: boolean;
  stock: number;
  categoryId: string;
}

export interface CreateProductPrisma extends CreateProduct {
  barbershopId: string;
}

export interface Product extends CreateProductPrisma {
  id: string;
}

export interface ProductRepository {
  create(data: CreateProductPrisma): Promise<null | Product>;
  getAll(barbershopId: string): Promise<null | Product[]>;
  getByName(data: {
    barbershopId: string;
    name: string;
  }): Promise<null | Product[]>;
  getById(id: string): Promise<null | Product>;
  updateName(data: { id: string; value: string }): Promise<null | Product>;
  updateNameWeight(data: {
    id: string;
    value: string;
  }): Promise<null | Product>;
  updateDescribe(data: { id: string; value: string }): Promise<null | Product>;
  updateWeight(data: { id: string; value: number }): Promise<null | Product>;
  updatePrice(data: { id: string; value: number }): Promise<null | Product>;
  updateCost(data: { id: string; value: number }): Promise<null | Product>;
  updateWorktop(data: { id: string; value: boolean }): Promise<null | Product>;
  updateStock(data: { id: string; value: number }): Promise<null | Product>;
  delete(id: string): Promise<null | Product>;
}
