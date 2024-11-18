export interface CreateBarbershop {
  name: string;
  addressId: string;
}

export interface Barbershop extends CreateBarbershop {
  id: string;
}

export interface BarbershopRepository {
  create(data: CreateBarbershop): Promise<null | Barbershop>;
  getById(id: string): Promise<null | Barbershop>;
  getByName(name: string): Promise<null | Barbershop[]>;
  getAll(): Promise<null | Barbershop[]>;
  delete(id: string): Promise<null | Barbershop>;
}
