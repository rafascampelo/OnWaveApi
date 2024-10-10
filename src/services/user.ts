import { compare, hash } from "bcrypt";
import { CreateDev, CreateUser, Login, User } from "../interfaces/user";
import { UserRepositoryPrisma } from "../repositories/user";
import { randomInt } from "crypto";
import jwt from "jsonwebtoken";
import auth from "../config/auth";
import { invalidTokens } from "../middleware/middleware";
export class UserServices {
  private userRepository;

  constructor() {
    this.userRepository = new UserRepositoryPrisma();
  }

  async sigin(
    data: Login
  ): Promise<null | { message: string; user?: User; token?: string }> {
    const user = await this.userRepository.getByEmail(data.email);

    if (!user) return null;

    const match = await compare(data.password, user.password);

    if (!match) return { message: "senha incorreta" };

    const token = jwt.sign({ id: user.id }, auth.secret, {
      expiresIn: 86400,
    });

    return { message: "Usuário logado", user, token };
  }

  logout(token: string): boolean {
    if (!invalidTokens.includes(token)) {
      invalidTokens.push(token);

      return true;
    }
    return false;
  }

  async createEmployee(data: CreateUser): Promise<null | User> {
    const {
      firstName,
      lastName,
      email,
      password,
      barbeshopId,
      born,
      cellphone,
      cpf,
      role,
      unitId,
      adminId,
    } = data;
    const hashPassword = await hash(password, randomInt(10, 16));
    const result = await this.userRepository.createUser({
      firstName,
      lastName,
      email,
      password: hashPassword,
      barbeshopId,
      born,
      cellphone,
      cpf,
      role,
      unitId,
      adminId,
    });

    return result;
  }

  async create(data: CreateDev): Promise<null | User> {
    const { firstName, lastName, email, password } = data;
    const hashPassword = await hash(password, randomInt(10, 16));
    const result = await this.userRepository.createDev({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    return result;
  }
  async getAllUsers(): Promise<null | User[]> {
    return await this.userRepository.getUsers();
  }
  async findUser(id: string): Promise<null | User> {
    return await this.userRepository.getById(id);
  }

  async findEmployees(id: string): Promise<null | User[]> {
    return await this.userRepository.getEmployess(id);
  }

  async findUsersByName(value: string): Promise<null | User[]> {
    return await this.userRepository.getByName(value);
  }

  async updateCellphone(data: {
    id: string;
    value: string;
  }): Promise<null | User> {
    return this.userRepository.updateCellphone(data);
  }

  async updatePassword(data: {
    id: string;
    value: string;
  }): Promise<null | User> {
    const { id, value } = data;
    const hashPassword = await hash(value, randomInt(10, 16));

    return this.userRepository.updatePassword({ id, value: hashPassword });
  }

  async delete(id: string): Promise<null | User> {
    return this.userRepository.delete(id);
  }

  async deleteEmployee(data: {
    userId: string;
    employeeId: string;
  }): Promise<null | User> {
    const { userId, employeeId } = data;

    const employee = await this.findUser(employeeId);

    if (!employee) return null;

    if (employee.adminId !== userId) return null;

    return await this.userRepository.delete(employeeId);
  }
}
