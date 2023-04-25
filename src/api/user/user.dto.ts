import { Trim } from 'class-sanitizer';
import { IsOptional, IsString, IsEmail } from 'class-validator';

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