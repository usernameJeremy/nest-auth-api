import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/api/user/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto, LoginDto } from './auth.dto';
import { AuthHelper } from './auth.helper';

@Injectable()
export class AuthService {
    //injecteren de repo geven user mee als parameter
  @InjectRepository(User)
  private readonly repository: Repository<User>;
//injecteer de authhelper
  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  public async register(body: RegisterDto): Promise<User | never> {
    const { name, email, password }: RegisterDto = body;

    // gaat eerst checken of de de email al bekend is in de database zo ja kan de gebruiker zich niet registreren.
    let user: User = await this.repository.findOne({ where: { email } });
    if (user) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }

    user = new User();

    user.name = name;
    user.email = email;
    user.password = this.helper.encodePassword(password);

    return this.repository.save(user);
  }

  public async login(body: LoginDto): Promise<string | never> {
    const { email, password }: LoginDto = body;
    const user: User = await this.repository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid: boolean = this.helper.isPasswordValid(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    this.repository.update(user.id, { lastLoginAt: new Date() });

    return this.helper.generateToken(user);
  }

  public async refresh(user: User): Promise<string> {
    this.repository.update(user.id, { lastLoginAt: new Date() });

    return this.helper.generateToken(user);
  }
}