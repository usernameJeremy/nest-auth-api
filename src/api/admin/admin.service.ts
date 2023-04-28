import { Injectable } from "@nestjs/common";
import { User } from "../user/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "../enum/role.enum";


@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){}

    async updateUserRoles(roles: Role[], user: User): Promise<User> {
        user.roles = roles;
        const updatedUser = await this.userRepository.save(user);
        return updatedUser;
      }
      


}