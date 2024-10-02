import { prisma } from "../database/prisma-client";
import { CreateProduct, Product, ProductRepository } from "../interfaces/product";

export class ProductRepositoryPrisma implements ProductRepository{
    async create(data: CreateProduct): Promise<null | Product> {
        const {barbershopId,cost,name,nameWeight,price,userId,weight,workTop,describe,img} = data;

        return await prisma.products.create({
            data:{
                userId,
                name,
                weight,
                nameWeight,
                cost,
                price,
                img,
                describe,
                workTop,
                barbershopId
            }
        })
    }

    async getAll(): Promise<null | Product[]> {
        return await prisma.products.findMany()
    }

    async getByName(name: string): Promise<null | Product[]> {
        return await prisma.products.findMany({
            where:{
                name: {contains : name}
            },
            orderBy:{
                name: "asc"
            }
        })
    }

    async getById(id: string): Promise<null | Product> {
        return await prisma.products.findUnique({
            where:{
                id
            }
        })
    }

    async update(data: {id: string ,row: string; value: string; }): Promise<null | Product> {
        

        return await prisma.products.update({
            where:{
                id
            },data:{

            }
        })
    }
}