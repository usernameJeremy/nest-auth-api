import { Body, Controller, Get, Delete, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from '@/api/user/auth/auth.guard';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { GetUser } from "../user/get-user.decorator";

import { User } from "../user/user.entity";
import { TodoDto } from "./todo.dto";
import { Todo } from "./todo.entity";

import { TodoService } from "./todo.service";

@ApiTags('Todo')
@ApiBearerAuth()
@Controller('todo')
@UseGuards(JwtAuthGuard)
export class TodoController {
    constructor(
        private todoService: TodoService
    ) { }

    @Post()
    async createTodo(
        @GetUser() user: User,
        @Body() todoDto: TodoDto,
    ): Promise<Todo> {

        return this.todoService.createTodo(todoDto, user);
    }

    @Get()
    async getTodoListsByUser(@GetUser() user: User): Promise<Todo[]> {
        return this.todoService.getTodoListsByUser(user);
    }

    @Patch('todo-lists/:id')
    async updateTodoList(
        @GetUser() user: User,
        @Param('id', ParseIntPipe) id: number,
        @Body() todoDto: TodoDto,
    ): Promise<Todo> {
        return await this.todoService.updateTodoList(id, todoDto, user);
    }

    @Delete('todo-lists/:id')
    async deleteTodoList(
        @GetUser() user: User,
        @Param('id', ParseIntPipe) id: number,
    ): Promise<string> {
        await this.todoService.deleteTodoList(id, user);
        return `Todo list with id ${id} successfully deleted`;
    }






 
    //delete lijst


}