import { IsEnum } from 'class-validator';
import { Role } from './role.enum';


export class RoleDto {

    id: number;

    @IsEnum(Role)
    roles: Role;
}