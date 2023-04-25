import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoRepository } from './todo.repository';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { Todo } from './todo.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([ Todo, TodoRepository]),
        
    ],
    controllers: [TodoController],
    providers: [
        TodoService,
        
    ]
})
export class TodoModule {}
