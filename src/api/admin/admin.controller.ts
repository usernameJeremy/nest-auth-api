import { Body, Controller, Put, UseGuards } from "@nestjs/common";
import { User } from "../user/user.entity";
import { RoleDto } from "../enum/role.dto";
import { AdminService } from "./admin.service";
import { GetUser } from "../user/get-user.decorator";
import { Role } from "../enum/role.enum";
import { JwtAuthGuard } from "../user/auth/auth.guard";



@Controller()
@UseGuards(JwtAuthGuard)
export class AdminController {
    constructor(
        
        private adminService: AdminService,
        
    ) { }

    @Put('users/:id/roles')
    async updateUserRoles(
        @GetUser() user: User,
        @Body() roleDto: RoleDto,
    ): Promise<User> {
        const { roles  } = roleDto;
        const userRoles = await this.adminService.updateUserRoles( roles , user);
        return userRoles;
    }
}