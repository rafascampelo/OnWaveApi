import { CreateProductPrisma, Product } from "../interfaces/product";
import { ProductRepositoryPrisma } from "../repositories/product";

export class ProductServices {
  private productRepository;

  constructor() {
    this.productRepository = new ProductRepositoryPrisma();
  }

  async create(data: CreateProductPrisma) {
    const {
      barbershopId,
      categoryId,
      cost,
      name,
      nameWeight,
      stock,
      weight,
      workTop,
      describe,
      price,
    } = data;

    return await this.productRepository.create({
      barbershopId,
      categoryId,
      cost: Number(cost),
      name,
      nameWeight,
      stock: Number(stock),
      weight: Number(weight),
      workTop,
      describe,
      price: !price ? price : Number(price),
    });
  }

  async getAll(barbershopId: string): Promise<null | Product[]> {
    return await this.productRepository.getAll(barbershopId);
  }

  async getById(id: string): Promise<null | Product> {
    return await this.productRepository.getById(id);
  }

  async find(data: {
    barbershopId: string;
    name: string;
  }): Promise<null | Product[]> {
    return await this.productRepository.getByName(data);
  }

  async updateName(data: {
    id: string;
    value: string;
  }): Promise<null | Product> {
    return await this.productRepository.updateName(data);
  }

  async updateNameWeight(data: {
    id: string;
    value: string;
  }): Promise<null | Product> {
    return await this.productRepository.updateNameWeight(data);
  }

  async updateDescribe(data: {
    id: string;
    value: string;
  }): Promise<null | Product> {
    return await this.productRepository.updateDescribe(data);
  }

  async updateCost(data: {
    id: string;
    value: number;
  }): Promise<null | Product> {
    const { id, value } = data;

    return await this.productRepository.updateCost({
      id,
      value: Number(value),
    });
  }

  async updatePrice(data: {
    id: string;
    value: number;
  }): Promise<null | Product> {
    const { id, value } = data;

    return await this.productRepository.updatePrice({
      id,
      value: Number(value),
    });
  }

  async updateWeight(data: {
    id: string;
    value: number;
  }): Promise<null | Product> {
    const { id, value } = data;

    return await this.productRepository.updateWeight({
      id,
      value: Number(value),
    });
  }

  async updateWorktop(data: {
    id: string;
    value: boolean;
  }): Promise<null | Product> {
    return await this.productRepository.updateWorktop(data);
  }

  async updateStock(data: {
    id: string;
    value: number;
  }): Promise<null | Product> {
    const { id, value } = data;

    const product = await this.getById(id);

    if (!product) return null;

    const newValue = product.stock + value;

    return await this.productRepository.updateStock({ id, value: newValue });
  }

  async delete(id: string): Promise<null | Product> {
    return await this.productRepository.delete(id);
  }
}
