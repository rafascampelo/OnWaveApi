import { BarbershopRepositoryPrisma } from "../repositories/barbershop";
import { User } from "../interfaces/user";
import { UserRepositoryPrisma } from "../repositories/user";
import { Barbershop, CreateBarbershop } from "../interfaces/barbershop";

export class BarbershopServices {
  private barbershopRepository;
  private userRepository;

  constructor() {
    this.barbershopRepository = new BarbershopRepositoryPrisma();
    this.userRepository = new UserRepositoryPrisma();
  }

  async create(data: CreateBarbershop): Promise<null | Barbershop> {
    return await this.barbershopRepository.create(data);
  }

  async getAll(): Promise<null | Barbershop[]> {
    return await this.barbershopRepository.getAll();
  }

  async getById(id: string): Promise<null | Barbershop> {
    return await this.barbershopRepository.getById(id);
  }

  async getEmployees(id: string): Promise<null | User[]> {
    return await this.userRepository.getByBarbershopId(id);
  }

  async find(name: string): Promise<null | Barbershop[]> {
    return await this.barbershopRepository.getByName(name);
  }

  async delete(id: string): Promise<null | Barbershop> {
    return await this.barbershopRepository.delete(id);
  }
}
