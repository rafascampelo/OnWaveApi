import { compare, hash } from "bcrypt";
import { CreateUser, Login, User } from "../interfaces/user";
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
    console.log(data.email);
    console.log(data.password);
    const nuser = await this.userRepository.getByEmail(data.email);

    console.log(nuser);

    if (!nuser) {
      console.log("oi");
      return null;
    }

    const match = await compare(data.password, nuser.password);

    if (!match) {
      console.log("senha errada");
      return { message: "senha incorreta" };
    }

    const token = jwt.sign({ id: nuser.id }, auth.secret, {
      expiresIn: 86400,
    });

    const user = { ...nuser, token };
    console.log("logado");

    return { message: "Usuário logado", user };
  }

  logout(token: string): boolean {
    if (!invalidTokens.includes(token)) {
      invalidTokens.push(token);

      return true;
    }
    return false;
  }

  async create(data: CreateUser): Promise<null | User> {
    const {
      firstname,
      lastname,
      email,
      password,
      cellphone,
      role,
      adminId,
      barbershopId,
      commissionProcedure,
      commissionProduct,
      fixedPayment,
    } = data;

    let Vpassword = !password ? "0000" : password;
    const firstLogin = password ? false : true;

    const hashPassword = await hash(Vpassword, randomInt(10, 16));
    const result = await this.userRepository.createUser({
      firstname,
      lastname,
      email,
      password: hashPassword,
      cellphone,
      role,
      adminId,
      barbershopId,
      commissionProcedure,
      commissionProduct,
      fixedPayment,
      firstLogin,
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
