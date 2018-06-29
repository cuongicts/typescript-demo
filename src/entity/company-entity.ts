import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { UserEntity } from './user-entity';

@Entity()
export class CompanyEntity {
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

    @ManyToOne(type => UserEntity, user => user.companies)
    owner: UserEntity;
}