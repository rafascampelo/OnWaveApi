import { ProductRepositoryPrisma } from "../repositories/product";

export class ProductService{
    private productRepository;

    constructor(){
        this.productRepository = ProductRepositoryPrisma
    }
}