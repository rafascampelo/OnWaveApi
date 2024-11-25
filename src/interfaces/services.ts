export interface CreateServices {
  clientName: string;
  procedures: { procedureId: string }[];
  products: { productId: string }[];
}

export interface CreateServicesPrisma extends CreateServices {
  price: number;
  userId: string;
  barbershopId: string;
  status: "doing" | "done";
}

export interface Services {
  id: string;
}


export interface ServicesRepository{
  create(data:CreateServicesPrisma): Promise<null| Services>
}