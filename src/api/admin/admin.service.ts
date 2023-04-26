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

    async updateUserRoles(id: number, roles: Role[], user: User): Promise<User> {
        const userToUpdate = await this.userRepository.findOne({where: { id }});
        userToUpdate.roles = roles[Role.USER, Role.ADMIN];
        await this.userRepository.save(userToUpdate);
        return userToUpdate;
      }
      


}