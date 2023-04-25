import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../user/user.entity";
import { TodoDto } from "./todo.dto";
import { Todo } from "./todo.entity";
import { TodoPayload } from "./todopayload.interface";
import { TodoRepository } from "./todo.repository";



@Injectable()
export class TodoService {
    constructor(
        
        @InjectRepository(TodoRepository)
        private todoRepo : TodoRepository
    ) {}

    async getAllTodo(user: User): Promise<TodoPayload[]>{
        return this.todoRepo.getAllTodo(user)
    }

    async createTodo(
        todoDto: TodoDto,
        user: User
    ): Promise<TodoPayload> {
        return this.todoRepo.createTodo(todoDto, user)
    }

    async getTodoById(
        id: number,
        user: User
    ): Promise<Todo> {
        const todo = await this.todoRepo.findOne({ where: { id, userId: user.id } })

        if (!todo) {
            throw new NotFoundException(`This ${id} is not found`);
        }
        return todo
    }

    async updateTodoById(id: number, todoDto: TodoDto, user: User): Promise<TodoPayload> {
        const todo = await this.getTodoById(id, user)
        todo.title = todoDto.title
        todo.description = todoDto.description

        await todo.save()
        return {
            id: todo.id,
            title: todo.title,
            description: todo.description,
            createdDate: todo.createdDate,
            updatedDate: todo.updatedDate
        }
    }

    async deleteTodoById(id: number, user: User): Promise<{ message: string }> {
        const todo = await this.todoRepo.delete({ id, userId: user.id })

        if (todo.affected === 0) {
            throw new NotFoundException(`This ${id} is not found`)
        }
        return { message: 'Deleted successfully !' }
    }
}