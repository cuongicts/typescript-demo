import request from 'supertest';
import { TemplateExecutor } from '../../node_modules/@types/lodash';
import { Connection, createConnection } from '../../node_modules/typeorm';
import { UserEntity } from '../entity/user-entity';
const app = require('./../app');

describe('GET /', () => {
    it('should return 200', (done) => {
      request(app).get('/')
        .expect(200, done);
    });
  });

describe('GET /register', () => {
    it('should return 404 Not Found', () => {
        return request(app).get('/register')
            .expect(404);
    });
});

describe('POST /register', () => {
    const user: any = {};

    it('should return 200 with data', (done) => {
        return request(app).post('/register')
            .send({email: 'cuongnv@gmail.com', password: '2'})
            .field('password', '123')
            .expect(200)
            .end((err, res) => {
                expect(res).toBeDefined();
                done();
            });
    });
});