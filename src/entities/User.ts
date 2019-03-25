import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { Car } from "./Car";
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

    @OneToMany(type => Car, car => car.user)
    cars: Car[];

}