import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { User } from '../user/user.entity';
import { Role } from '../enum/role.enum';


@Injectable()
export class AdminGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext): boolean {
    const user: User = context.switchToHttp().getRequest().user;
    return user && user.roles.includes(Role.ADMIN) ;
  }
}


