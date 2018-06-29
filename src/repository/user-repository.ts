import { UserEntity } from '../entity/user-entity';
import { getManager } from 'typeorm';


export class UserRepo {
    getAllUsers() {
        // get User repository and find all users
        return getManager().getRepository(UserEntity).find();
    }

    createUser(user: UserEntity) {
        return getManager().getRepository(UserEntity).save(user);
    }

    findOne(user: UserEntity) {
        return getManager().getRepository(UserEntity).findOne(user);
    }

    deleteUser(id: number) {
        return getManager().getRepository(UserEntity).delete(id);
    }
}