import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn, BeforeUpdate, BeforeInsert, AfterUpdate } from 'typeorm';
import { CompanyEntity } from './company-entity';
@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    userId: number;

    @ManyToOne(type => CompanyEntity, company => company.employees)
    company: CompanyEntity;

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
        length: 50,
        nullable: true
    })
    username: string;
    @CreateDateColumn({

    })
    created_at: Date;

    @AfterUpdate()
    async checkName() {
        console.log('afterUpdate: ', this.username);
    }
}