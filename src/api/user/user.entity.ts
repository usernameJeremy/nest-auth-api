import { Exclude } from 'class-transformer';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn,OneToMany, Admin } from 'typeorm';
import { Todo } from '../todo/todo.entity';
import { Role } from '../enum/role.enum';




@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar' })
  public email!: string;

  //we gaan deze data niet mee sturen met onze responsedata
  //uitroepteken achter password zorgt er voor dat deze waarde nooit null mag zijn
  @Exclude()
  @Column({ type: 'varchar' })
  public password!: string;

  
  @Column({ type: 'varchar', nullable: true })
  public name: string | null;

  @Column({ type: 'timestamp', nullable: true, default: null })
  public lastLoginAt: Date | null;

 
  @Column({
    type: 'simple-array',
    enum: Role,
    default: Role.USER,
    
  })
  roles: Role[];

 // eager zorgt ervoor dat de relatie automatisch tezamen met hoofdobject word geladen. { eager: true }
  @OneToMany(type => Todo, todo => todo.user)
  public todo: Todo[]

}