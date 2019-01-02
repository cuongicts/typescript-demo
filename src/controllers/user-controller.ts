'use strict';

import { Request, Response } from 'express';
import { UserRepo } from '../repository/user-repository';
import { UserEntity } from '../entity/user-entity';
import { getRepository } from 'typeorm';
import axios from 'axios';
import formidable from 'formidable';
import bcrypt from 'bcrypt-nodejs';
import * as _ from 'lodash';

/**
 * GET /
 * Home page.
 */

export let muaVe = async (req: Request, res: Response) => {
  const url = 'http://www.vebongdaonline.vn/checkValidBookTicket';
  const body = {
    matchId: '30',
    price: '200000',
    seat: '4',
  };

  const result = await axios.post(url, body);

};

export let register = async (req: Request, res: Response) => {
  console.log('POST Register');

  const uRepo: UserRepo = new UserRepo();
  const userRepsitory = getRepository(UserEntity);
  const user = new UserEntity();
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.username = req.body.username;
  user.email = req.body.email;
  user.password = '123456';

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return res.status(400).json({
        code: 400,
        status: 'error',
        data: {
          message: 'Bad request',
          error: err,
        }
      });
    }
    bcrypt.hash(user.password, salt, undefined, async (err, hash) => {
      if (err) {
        return res.status(400).json({
          code: 400,
          status: 'error',
          data: {
            message: 'Bad request',
            error: err,
          }
        });
      }
      user.password = hash;
      await userRepsitory.save(user);
      return res.json({
        code: 200,
        status: 'success',
        data: _.omit(user, 'password')
      });
      // uRepo.createUser(user).then((u) => {
      //   return res.json({
      //     code: 200,
      //     status: 'success',
      //     data: _.omit(u, 'password')
      //   });
      // }).catch(error => res.status(400).json({
      //   code: 400,
      //   status: 'error',
      //   data: {
      //     message: 'Bad request',
      //     error: error,
      //   }
      // }));
    });
  });
};

export let getAllUsers = async (req: Request, res: Response) => {
  const uRepo = getRepository(UserEntity);

  console.log('GET GetAllUsers');

  uRepo.find().then((result: any) => {
    return res.json({
      code: 200,
      status: 'success',
      data: {
        result
      }
    });
  });
};

export let updateAllUsers = async (req: Request, res: Response) => {
  const uRepo = getRepository(UserEntity);

  console.log('Update AllUsers');

  const users = await uRepo.find();
  users.map(async user => {
    user.firstName = 'Nguyen';
    await uRepo.save(user);
  });
  return res.json({
    code: 200,
    status: 'success',
    data: {
    }
  });
};

export let login = async (req: Request, res: Response) => {
  const uRepo = getRepository(UserEntity);
  console.log(req.body);

  const user = await uRepo.findOne({ email: req.body.email });
  if (!user) {
    return res.status(401).json({
      code: 401,
      status: 'error',
      data: {
      message: 'Invalid email or password',
      }
    });
  } else {
    bcrypt.compare(req.body.password, user.password, (error, isMatch) => {
      if (error) {
        return res.status(400).json({
          code: 400,
          status: 'error',
          data: {
            message: 'Bad request',
            error: error,
          }
        });
      }

      if (!isMatch) {
        return res.status(401).json({
          code: 401,
          status: 'error',
          data: {
            message: 'Invalid email or password',
          }
        });
      }

      const userData = _.omit(user, 'password');
      return res.json({
        code: 200,
        status: 'success',
        data: {
          user: userData
        }
      });
    });
  }
};

export let deleteUser = async (req: Request, res: Response) => {
  const uRepo: UserRepo = new UserRepo();

  console.log('POST deleteUser');
  if (req.body.userId) {
    uRepo.deleteUser(req.body.userId).then((result: any) => {
      console.log('Result: :' + result);
      res.send(result);
    });
  } else {
    res.send({
      message: 'The parameter userId is requried!'
    });
  }
};


export let upload = async (req: Request, res: Response) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = './';
  form.parse(req, (err, fields, files) => {
    err && console.log(err);
    if (files) {
      res.json({
        result: files
      });
    }
  });
};
