export interface CreateCategory {
  name: string;
}

export interface CreateCategoryPrisma extends CreateCategory {
  barbershopId: string;
}

export interface Category extends CreateCategoryPrisma {
  id: string;
}

export interface CategoryRepository {
  create(data: CreateCategoryPrisma): Promise<null | Category>;
  getAll(data: { barbershopId: string }): Promise<Category[]>;
  getById(id: string): Promise<null | Category>;
  updateName(data: { id: string; value: string }): Promise<null | Category>;
  delete(id: string): Promise<null | Category>;
}
