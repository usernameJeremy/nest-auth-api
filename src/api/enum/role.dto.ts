import { IsEnum } from 'class-validator';
import { Role } from './role.enum';


export class RoleDto {

    id: number;

    @IsEnum(Role, { each: true })
    roles: Role[];
}

export class RemoveRoleDto {
    @IsEnum(Role)
    role: Role;
  }