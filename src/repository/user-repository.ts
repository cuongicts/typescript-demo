import { User } from '../entity/user';
import { getManager } from 'typeorm';


export class UserRepo {
  getAllUsers() {
    // get User repository and find all users
    return getManager().getRepository(User).find();
  }

  createUser(user: User) {
    return getManager().getRepository(User).save(user);
  }

  findOne(user: User) {
    return getManager().getRepository(User).findOne(user);
  }

  deleteUser(id: number) {
    return getManager().getRepository(User).delete(id);
  }
}