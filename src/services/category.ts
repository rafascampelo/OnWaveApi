import { Category, CreateCategoryPrisma } from "../interfaces/category";
import { CategoryRepositoryPrisma } from "../repositories/category";

export class CategoryServices {
  private categoryRepository;

  constructor() {
    this.categoryRepository = new CategoryRepositoryPrisma();
  }

  async create(data: CreateCategoryPrisma): Promise<null | Category> {
    return await this.categoryRepository.create(data);
  }

  async getAll(data: { barbershopId: string }): Promise<Category[]> {
    return await this.categoryRepository.getAll(data);
  }

  async getById(id: string): Promise<null | Category> {
    return await this.categoryRepository.getById(id);
  }

  async updateName(data: {
    id: string;
    value: string;
  }): Promise<null | Category> {
    return await this.categoryRepository.updateName(data);
  }

  async delete(id: string): Promise<null | Category> {
    return await this.categoryRepository.delete(id);
  }
}
