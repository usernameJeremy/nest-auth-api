import { Body, Controller, Put, UseGuards } from "@nestjs/common";
import { User } from "../user/user.entity";
import { RoleDto } from "../enum/role.dto";
import { AdminService } from "./admin.service";
import { GetUser } from "../user/get-user.decorator";
import { Role } from "../enum/role.enum";
import { JwtAuthGuard } from "../user/auth/auth.guard";



@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
    constructor(
        private adminService: AdminService,
        private roles: Role
    ) { }

    @Put('users/:id/roles')
    async updateUserRoles(
        @GetUser() user: User,
        @Body() roleDto: RoleDto,
    ): Promise<User> {
        const { id, roles } = roleDto;
        const userRoles = await this.adminService.updateUserRoles(id, roles[roles], user);
        return userRoles;
    }
}