import { CreateProduct, Product } from "../interfaces/product";
import { ProductRepositoryPrisma } from "../repositories/product";

export class ProductService{
    private productRepository;

    constructor(){
        this.productRepository = new ProductRepositoryPrisma()
    }

    async create(data: CreateProduct): Promise<null| Product>{       
        return await this.productRepository.create(data)
    }

    async get(): Promise<null| Product[]>{
        return await this.productRepository.getAll();
    }

    async getById(id: string): Promise<null |Product>{
        return await this.productRepository.getById(id)
    }

    async find(name: string): Promise<null | Product[]>{
        return await this.productRepository.getByName(name)
    }

    async updateName(data:{id: string, value: string}): Promise<null | Product>{
        return await this.productRepository.updateName(data)
    }

    async updateNameWeight(data:{id: string, value: string}): Promise<null | Product>{
        return await this.productRepository.updateNameWeight(data)
    }

    async updateDescribe(data:{id: string, value: string}): Promise<null | Product>{
        return await this.productRepository.updateDescribe(data)
    }

    async updateCost(data:{id: string, value: number}): Promise<null | Product>{
        return await this.productRepository.updateCost(data)
    }
    
    async updatePrice(data:{id: string, value: number}): Promise<null | Product>{
        return await this.productRepository.updatePrice(data)
    }

    async updateWeight(data:{id: string, value: number}): Promise<null | Product>{
        return await this.productRepository.updateWeight(data)
    }

    async updateWorktop(data:{id: string, value: boolean}): Promise<null | Product>{
        return await this.productRepository.updateWorktop(data)
    }

    async delete(id: string): Promise< null | Product>{
        return await this.productRepository.delete(id)
    }
}