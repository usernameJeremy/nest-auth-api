import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { JwtAuthGuard } from '@/api/user/auth/auth.guard';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { GetUser } from "../user/get-user.decorator";
import { User } from "../user/user.entity";
import { TodoDto } from "./todo.dto";
import { Todo } from "./todo.entity";
import { TodoPayload } from "./todopayload.interface";
import { TodoService } from "./todo.service";

@ApiTags('Todo')
@ApiBearerAuth()
@Controller('todo')
@UseGuards(JwtAuthGuard)
export class TodoController {
    constructor(
        private todoService: TodoService
    ) {}

    @Get('todos')
    getAllTodo(
        @GetUser() user: User
    ): Promise<TodoPayload[]> {
        return this.todoService.getAllTodo(user)
    }

    // info over validationpipe : https://docs.nestjs.com/techniques/validation
    // info over UsePipes https://docs.nestjs.com/pipes
    @Post('createtodo')
    @UsePipes(ValidationPipe)
    createTodo(
        @Body() todoDto: TodoDto,
        @GetUser() user: User
    ): Promise<TodoPayload> {
        return this.todoService.createTodo(todoDto, user)
    }
//parseIntPipe zorgt ervoor dat als je de todobyid ophaalt het id een integer moet zijn. 
//als dat niet het geval is word er automatisch een BadRequestExecption gegooit
    @Get('/:id')
    getTodoById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User
    ): Promise<Todo> {
        return this.todoService.getTodoById(id, user)
    }

    @Patch('/:id')
    updateTodoById(
        @Param('id', ParseIntPipe) id: number,
        @Body() todoDto: TodoDto,
        @GetUser() user: User
    ): Promise<TodoPayload>{
        return this.todoService.updateTodoById(id, todoDto, user)
    }

    @Delete('/:id')
    deleteTodoById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User
    ): Promise<{ message: string }>{
        return this.todoService.deleteTodoById(id, user)
    }
}