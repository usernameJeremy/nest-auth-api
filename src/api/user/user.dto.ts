import { Trim } from 'class-sanitizer';
import { IsOptional, IsString, IsEmail } from 'class-validator';
import { Role } from '../enum/role.enum';

export class UpdateNameDto {
  @IsString()
  @IsOptional()
  public readonly name?: string;
}

export class ChangeEmail {
    @IsEmail()
    @Trim()
    public readonly email: string;
}

export class UserInfoDto {
  id: number;
  email: string;
  name: string | null;
  lastLoginAt: Date | null;
  roles: Role[];
}