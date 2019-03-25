import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm";
import { User } from "./User";
@Entity()
export class Car extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text', {nullable:true})
    brand: string;

    @Column('text', {nullable:true})
    model: string;

    @Column('int', {nullable:true})
    year: number;

    @ManyToOne(type => User, user => user.cars)
    user: User;

}