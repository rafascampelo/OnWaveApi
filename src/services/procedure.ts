import { ProcedureRepositoryPrisma } from "../repositories/procedure";
import { CreateProcedurePrisma, Procedure } from "../interfaces/procedure";

export class ProcedureServices {
  private procedureRepository;

  constructor() {
    this.procedureRepository = new ProcedureRepositoryPrisma();
  }

  async create(data: CreateProcedurePrisma): Promise<null | Procedure> {
    return await this.procedureRepository.create(data);
  }

  async getAll(barbershopId: string): Promise<null | Procedure[]> {
    return await this.procedureRepository.getAll(barbershopId);
  }

  async getById(id: string): Promise<null | Procedure> {
    return await this.procedureRepository.getById(id);
  }

  async getByName(data: {
    barbershopId: string;
    name: string;
  }): Promise<null | Procedure[]> {
    return await this.procedureRepository.getByName(data);
  }

  async updateName(data: {
    id: string;
    value: string;
  }): Promise<null | Procedure> {
    return this.procedureRepository.updateName(data);
  }

  async updateDescribe(data: {
    id: string;
    value: string;
  }): Promise<null | Procedure> {
    return await this.procedureRepository.updateDescribe(data);
  }

  async updateCost(data: {
    id: string;
    value: number;
  }): Promise<null | Procedure> {
    const { id, value } = data;

    return await this.procedureRepository.updateCost({
      id,
      value: Number(value),
    });
  }

  async updatePrice(data: {
    id: string;
    value: number;
  }): Promise<null | Procedure> {
    const { id, value } = data;

    return await this.procedureRepository.updateCost({
      id,
      value: Number(value),
    });
  }

  async delete(id: string): Promise<null | Procedure> {
    return await this.procedureRepository.delete(id);
  }
}
