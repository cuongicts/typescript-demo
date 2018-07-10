import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { CompanyEntity } from './company-entity';
@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    userId: number;
    @OneToMany(type => CompanyEntity, company => company.owner)
    companies: CompanyEntity[];
    @Column({
        length: 50
    })
    firstName: string;

    @Column({
        length: 50
    })
    lastName: string;

    @Column({
        length: 50
    })
    email: string;

    @Column({
        length: 100
    })
    password: string;
    @Column({
        length: 50
    })
    username: string;
}