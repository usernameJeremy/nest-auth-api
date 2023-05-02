import { ClassSerializerInterceptor, Controller, Req, UseGuards, UseInterceptors, Body, Inject, Patch, Get } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '@/api/user/auth/auth.guard';
import { ChangeEmail, UpdateNameDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { GetUser } from './get-user.decorator';

@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @Patch('name')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private updateName(@Body() body: UpdateNameDto, @Req() req: Request): Promise<User> {
    return this.service.updateName(body, req);
  }

  @Patch('email')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private updateEmail(@Body() body: ChangeEmail, @Req() req: Request): Promise<User>{
    return this.service.changeEmail(body, req);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
 async getActiveUser(
  @GetUser() user: User
 ): Promise<User> {
  return await this.service.getUser(user);
 }

  //changepassword
}