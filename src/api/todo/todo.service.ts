import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../user/user.entity";
import { TodoDto } from "./todo.dto";
import { Todo } from "./todo.entity";
import { Repository } from "typeorm";



@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo)
        private repository: Repository<Todo>,


    ) { }



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

    async getTodoListsByUser(
        user: User
    ): Promise<Todo[]> {
        const todos = await this.repository.find({
            where: {
                userId: user.id,
            },
        });
        return todos;
    }

    async getTodoById( user: User, todoId : number,): Promise<Todo>{
        const todoListsFromUser = await this.repository.findOne({
            where: {
                userId: user.id,
                id: todoId
            },
        })
        console.log(todoListsFromUser);
        if(!todoListsFromUser){
            throw new NotFoundException("geen todo lijstjes gevonden")
        }
       return todoListsFromUser;
    }

    async getTodoListsById(
        user: User
      ): Promise<Todo[]> {
        const todoList = await this.repository.find({ where: { userId: user.id } });
        return todoList;
      }
      


    async updateTodoList(
        id: number,
        tododto: TodoDto,
        user : User
    ): Promise<Todo> {
        const todoLists = await this.getTodoListsById(user);
        const todoList = todoLists.find(todo => todo.id === id);
        if (!todoList) {
            throw new NotFoundException(`Todo list with id ${id} not found`);
        }
        if (todoList.userId !== user.id) {
            throw new UnauthorizedException('jij bent helemaal niet geauthoriseert om dit aan te passen lulletje rozenwater');
          }
        if (tododto.title) {
            todoList.title = tododto.title;
        }
        if (tododto.description) {
            todoList.description = tododto.description;
        }
        await this.repository.save(todoList);
        return todoList;
    }

    async deleteTodoList(id: number, user: User): Promise<void> {
        const todoLists = await this.getTodoListsById(user);
        const todoList = todoLists.find(todo => todo.id === id);
        if (!todoList) {
          throw new NotFoundException(`Todo list with id ${id} not found`);
        }
        await this.repository.delete(id);
        
      }


}

