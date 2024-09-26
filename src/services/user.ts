import { hash } from "bcrypt";
import { CreateDev, User } from "../interfaces/user";
import { UserRepositoryPrisma } from "../repositories/user";
import { randomInt } from "crypto";

export class UserServices {
   private userRepository;

   constructor() {
      this.userRepository = new UserRepositoryPrisma();
   }

   async create(data: CreateDev): Promise<null | User> {
      const { firstName, lastName, email, password } = data;
      const hashPassword = await hash(password, randomInt(10, 16));
      const result = await this.userRepository.create({
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
   async findUser(id: string) {
      return await this.userRepository.getById(id);
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
