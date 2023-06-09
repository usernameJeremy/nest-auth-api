import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from '../admin/admin.module';



@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule,AdminModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}