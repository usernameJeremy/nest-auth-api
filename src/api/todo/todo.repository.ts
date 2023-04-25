import { User } from "../user/user.entity";
import { Repository } from "typeorm";
import { TodoDto } from "./todo.dto";
import { Todo } from "./todo.entity";
import { TodoPayload } from "./todopayload.interface";


export class TodoRepository extends Repository<Todo> {
    async createTodo(
        todoDto: TodoDto,
        user: User
    ): Promise<Todo> {
        const { title, description } = todoDto

        const todo = new Todo()

        todo.title = title
        todo.description = description
        todo.user = user

        await todo.save()

        delete todo.user
        return todo
    }

    async getAllTodo(user: User): Promise<TodoPayload[]> {
        const query = this.createQueryBuilder('todo')

        query.where('todo.userId = :userId', { userId: user.id })

        const todos = await query.getMany()
        return todos
    }
}