import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/user.entity";
import { AdminService } from "./admin.service";

import { AdminController } from "./admin.controller";
import { AdminGuard } from "./admin.guard";
import { Todo } from "../todo/todo.entity";


@Module({
    imports: [
        TypeOrmModule.forFeature([ User, Todo ]),
        
    ],
    controllers: [AdminController],
    providers: [
        AdminService,
        AdminGuard,
        
    ]
})
export class AdminModule {}