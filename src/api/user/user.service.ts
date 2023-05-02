import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { ChangeEmail, UpdateNameDto, UserInfoDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  public async updateName(body: UpdateNameDto, req: Request): Promise<User> {
    const user: User = <User>req.user;

    user.name = body.name;

    return this.repository.save(user);
  }

  public async changeEmail(body: ChangeEmail, req: Request): Promise<User>{
    const email = body.email
    
    let user: User = await this.repository.findOne({ where: { email } });
    
    if(user && email){
    if (user.email === email) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }
  }
    const newuser: User = <User>req.user;
    newuser.email = body.email;

    return this.repository.save(newuser);
  }

  async getUser(user: User): Promise<User>{
      const activeUser = await this.repository.findOne({
        where: { id : user.id}
      })
    return activeUser;
  }

}