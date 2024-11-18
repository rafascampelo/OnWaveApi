export interface CreateUser {
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  cellphone: string;
  role: string;
  fixedPayment?: number;
  commissionProduct?: number;
  commissionProcedure?: number;
  firstLogin?: boolean;
  adminId?: string;
  barbershopId?: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  cellphone: string;
  role: string;
  fixedPayment: number | null;
  commissionProduct: number | null;
  commissionProcedure: number | null;
  adminId: string | null;
  barbershopId: string | null;
  firstLogin: boolean;
}

export interface UserRepository {
  createUser(data: CreateUser): Promise<null | User>;
  getByBarbershopId(id: string): Promise<null | User[]>;
  getByEmail(email: string): Promise<null | User>;
  getById(id: string): Promise<null | User>;
  getByName(value: string): Promise<null | User[]>;
  getUsers(): Promise<null | User[]>;
  updateCellphone(data: { id: string; value: string }): Promise<null | User>;
  updatePassword(data: { id: string; value: string }): Promise<null | User>;
  delete(id: string): Promise<null | User>;
}
