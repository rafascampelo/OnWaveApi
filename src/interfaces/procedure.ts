export interface CreateProcedure {
  name: string;
  cost: number;
  price: number;
  categoryId: string;
  describe?: string | null;
}

export interface CreateProcedurePrisma extends CreateProcedure {
  barbershopId: string;
}

export interface Procedure extends CreateProcedurePrisma {
  id: string;
}

export interface ProcedureRepository {
  create(data: CreateProcedurePrisma): Promise<null | Procedure>;
  getAll(barbershopId: string): Promise<null | Procedure[]>;
  getByName(data: {
    barbershopId: string;
    name: string;
  }): Promise<null | Procedure[]>;
  getById(id: string): Promise<null | Procedure>;
  updateName(data: { id: string; value: string }): Promise<null | Procedure>;
  updateDescribe(data: {
    id: string;
    value: string;
  }): Promise<null | Procedure>;
  updatePrice(data: { id: string; value: number }): Promise<null | Procedure>;
  updateCost(data: { id: string; value: number }): Promise<null | Procedure>;
  delete(id: string): Promise<null | Procedure>;
}
