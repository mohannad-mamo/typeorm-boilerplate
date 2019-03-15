import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text', {nullable:true})
    firstName: string;

    @Column('text', {nullable:true})
    lastName: string;

    @Column('int', {nullable:true})
    age: number;

}