import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoRepository } from './todo.repository';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { Todo } from './todo.entity';
import { User } from '../user/user.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([ Todo, TodoRepository, User]),
        
    ],
    controllers: [TodoController],
    providers: [
        TodoService,
        
    ]
})
export class TodoModule {}
