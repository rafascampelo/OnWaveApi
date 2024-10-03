import { prisma } from "../database/prisma-client";
import { CreateProduct, Product, ProductRepository } from "../interfaces/product";

export class ProductRepositoryPrisma implements ProductRepository{
    async create(data: CreateProduct): Promise<null | Product> {
        const {barbershopId,cost,name,nameWeight,price,userId,weight,workTop,describe} = data;

        return await prisma.products.create({
            data:{
                userId,
                name,
                weight,
                nameWeight,
                cost,
                price,
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

    async updateName(data: {id: string ,value: string; }): Promise<null | Product> {
        const {id, value} =data

        return await prisma.products.update({
            where:{
                id
            },data:{
                name :  value
            }
        })
    }
    
    async updateNameWeight(data: {id: string ,value: string; }): Promise<null | Product> {
        const {id, value} =data

        return await prisma.products.update({
            where:{
                id
            },data:{
                nameWeight :  value
            }
        })
    }

    async updateDescribe(data: {id: string ,value: string; }): Promise<null | Product> {
        const {id, value} =data

        return await prisma.products.update({
            where:{
                id
            },data:{
                describe :  value
            }
        })
    }

    async updateWeight(data: {id: string ,value:number; }): Promise<null | Product> {
        const {id, value} =data

        return await prisma.products.update({
            where:{
                id
            },data:{
                weight :  value
            }
        })
    }

    async updatePrice(data: {id: string ,value:number; }): Promise<null | Product> {
        const {id, value} =data

        return await prisma.products.update({
            where:{
                id
            },data:{
                price :  value
            }
        })
    }

    async updateCost(data: {id: string ,value:number; }): Promise<null | Product> {
        const {id, value} =data

        return await prisma.products.update({
            where:{
                id
            },data:{
                cost :  value
            }
        })
    }

    async updateWorktop(data: {id: string ,value: boolean; }): Promise<null | Product> {
        const {id, value} =data

        return await prisma.products.update({
            where:{
                id
            },data:{
                workTop :  value
            }
        })
    }

    async delete(id: string): Promise<null | Product> {
        return await prisma.products.delete({
            where:{
                id
            }
        })
    }
}