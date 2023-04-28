import {  Injectable,NotFoundException } from "@nestjs/common";
import { User } from "../user/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "../enum/role.enum";
import { Todo } from "../todo/todo.entity";

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Todo)
        private todoRepository: Repository<Todo>,
    ){}

    async updateUserRoles(roles: Role[], targetUserId: number): Promise<User> {
        const targetUser = await this.userRepository.findOne({where: {id: targetUserId}} );
      
        if (!targetUser) {
          throw new NotFoundException(`User with ID ${targetUserId} not found.`);
        }
      
        targetUser.roles = roles;
        const updatedUser = await this.userRepository.save(targetUser);
        return updatedUser;
      }
      
      async removeUserRole(role: Role, targetUserId: number): Promise<User> {
        const targetUser = await this.userRepository.findOne({ where: { id: targetUserId } });
      
        if (!targetUser) {
          throw new NotFoundException(`User with ID ${targetUserId} not found.`);
        }
      
        targetUser.roles = targetUser.roles.filter(r => r !== role);
        const updatedUser = await this.userRepository.save(targetUser);
        return updatedUser;
      }
      

      async getAllUsers(): Promise<User[]> {
        const users = await this.userRepository.find();
          return users;
        };
      

      async getUserById(targetUserId): Promise<User>{
        const user = await this.userRepository.findOne({where: {id : targetUserId}})
        return user;
      }

      async getAllTodos(): Promise<Todo[]>{
          const todos = await this.todoRepository.find();
        return todos;
      }

      async getTodoById(targetTodoId):Promise<Todo>{
        const todo = await this.todoRepository.findOne({where: { id : targetTodoId}})
        return todo;
      }

      async deleteUserById(targetDeleteId): Promise<string>{
        const user = await this.userRepository.findOne({where: { id : targetDeleteId}})
      this.userRepository.remove(user)
          return(`Gebruiker met id nummer: ${targetDeleteId} is verwijderd`);
      }

      async deleteTodoById(targetDeleteId): Promise<string>{
        const todo = await this.todoRepository.findOne({where: { id : targetDeleteId}})
      this.todoRepository.remove(todo)
          return(`Todo lijsjte met id nummer: ${targetDeleteId} is verwijderd`);
      }


      async updateUserInfo(email: string , name: string , targetUserId: number): Promise<User>{
        const userInfo = await this.userRepository.findOne({where: {id: targetUserId}})
        console.log(email, name);
        
        userInfo.email = email;
        userInfo.name = name;
      
         const updatedUser = await this.userRepository.save(userInfo)
        return updatedUser;
      }

}