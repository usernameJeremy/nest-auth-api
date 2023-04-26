import { User } from "../user/user.entity";
import { Repository } from "typeorm";
import { TodoDto } from "./todo.dto";
import { Todo } from "./todo.entity";



export class TodoRepository extends Repository<Todo> {
   

   
}