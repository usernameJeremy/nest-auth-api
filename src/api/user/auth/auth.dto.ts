import { Trim } from 'class-sanitizer';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @Trim()
  @IsEmail()
  public readonly email: string;

  @IsString()
  @MinLength(8)
  public readonly password: string;

  @IsString()
  @IsOptional()
  public readonly name?: string;
}

export class LoginDto {
  //trim zorgt er voor dat er een spatie voor of na de input kan zitten en haalt deze weg zodat je je gebruikersnaam automatisch kan laten invoeren en er dan automatisch een spatie achter staat.
  //readonly is zoals een document in windows je kan het alleen lezen de waarde word toegewezen bij initialisatie daarna kan het niet meer veranderd worden 
  @Trim()
  @IsEmail()
  public readonly email: string;

  @IsString()
  public readonly password: string;
}