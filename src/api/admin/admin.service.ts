import { Injectable,NotFoundException } from "@nestjs/common";
import { User } from "../user/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "../enum/role.enum";
import { UserInfoDto } from "../user/user.dto";


@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
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

}