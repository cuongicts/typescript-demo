import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, BeforeUpdate } from 'typeorm';
import { User } from './user-entity';

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    companyId: number;

    @Column({
        length: 50
    })
    email: string;
    @Column({
        length: 100
    })
    name: string;

    @Column({
        length: 1024
    })
    description: string;

    @OneToMany(type => User, user => user.company)
    employees: User[];
}