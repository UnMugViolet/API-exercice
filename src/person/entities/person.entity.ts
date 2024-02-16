import { Entity, TableInheritance, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
@TableInheritance({column: {type: "varchar", name:"type"}})

export class PersonEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phoneNumber: string;
}
