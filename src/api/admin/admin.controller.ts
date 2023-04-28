import { Body, Controller, Patch, UseGuards, Delete, Param, ParseIntPipe, Get } from "@nestjs/common";
import { User } from "../user/user.entity";
import { RemoveRoleDto, RoleDto } from "../enum/role.dto";
import { AdminService } from "./admin.service";
import { GetUser } from "../user/get-user.decorator";
import { JwtAuthGuard } from "../user/auth/auth.guard";
import { AdminGuard } from "./admin.guard";





@Controller()
@UseGuards(JwtAuthGuard, AdminGuard)
export class AdminController {
  constructor(
    private adminService: AdminService,
  ) { }

  @Patch('users/:id/roles')
  async updateUserRoles(
    @GetUser() admin: User,
    @Param('id', ParseIntPipe) targetUserId: number,
    @Body() roleDto: RoleDto,
  ): Promise<User> {
    const { roles } = roleDto;
    const userRoles = await this.adminService.updateUserRoles(roles, targetUserId);
    return userRoles;
  }
  

  @Delete('users/:id/roles')
  async removeUserRole(
    @GetUser() admin: User,
    @Param('id', ParseIntPipe) targetUserId: number,
    @Body() removeRoleDto: RemoveRoleDto,
  ): Promise<User> {
    const { role } = removeRoleDto;
    const userRoles = await this.adminService.removeUserRole(role, targetUserId);
    return userRoles;
  }

  @Get('users')
  async getAllUsers(): Promise<User[]> {
    return this.adminService.getAllUsers();
  }

  @Get('user/:id')
    async getUserById(
      @Param('id', ParseIntPipe) targetUserId: number,
    ): Promise<User>{
      return this.adminService.getUserById(targetUserId);
    }
  
}
