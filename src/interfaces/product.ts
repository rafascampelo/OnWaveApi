export interface CreateProduct{
    userId: string
    name: string
    weight: number
    nameWeight: string
    cost : number
    price : number
    img : string | null
    describe : string |null
    workTop: boolean
    barbershopId: string
}


export interface Product extends CreateProduct{
    id:string
}


export interface ProductRepository{
    create(data: CreateProduct):Promise<null| Product>
    getAll():Promise<null| Product[]>
    getByName(name: string):Promise<null| Product[]>
    getById(id: string):Promise<null| Product>
    update(data:{id: string,row: string,value: string}):Promise<null| Product>
    delete(id: string):Promise<null| Product>
}