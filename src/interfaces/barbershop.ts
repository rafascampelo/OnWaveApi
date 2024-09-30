export interface Barbershop {
   id: string;
   name: string;
}

export interface CreateBarbershop {
   name: string;
}

export interface BarbershopRepository {
   create(data: CreateBarbershop): Promise<null | Barbershop>;
   getById(id: string): Promise<null | Barbershop>;
   getByName(name: string): Promise<null | Barbershop[]>;
   getAll(): Promise<null | Barbershop[]>;
   delete(id: string): Promise<null | Barbershop>;
}
