import request from 'supertest';
import { app } from '../app';
import TestDb from '../utils/testDb';
import { User } from '../models/user';
import { hashPassword } from '../utils/authUtils';
import {Cookie} from "express-session";

const testDb = new TestDb();
const loginUser = async (username: string, password: string)=> {
  const response = await request(app)
      .post('/api/login')
      .send({ username: 'test', password: 'test' });

  const headers = response.headers as { [key: string]: string | string[] };
  return headers?.['set-cookie'] as string;
}

beforeAll(async () => {
  await testDb.connect();
});

afterAll(async () => {
  await testDb.close();
});

afterEach(async () => {
  await testDb.clear();
});

describe('Backend tests', () => {
  let id: string;
  beforeEach(async () => {
    const user = await User.create({
      userName: 'test',
      password: hashPassword('test'),
      firstName: 'test',
      lastName: 'test',
    });
    id = user.id;
  });
  describe('/api/login', () => {
    const url = '/api/login';
    describe('POST', () => {
      it('should login to the app', async () => {
        const response = await request(app)
          .post(url)
          .send({ username: 'test', password: 'test' });
        expect(response.statusCode).toBe(200);
      });

      it('should return 401 when wrong password', async () => {
        const response = await request(app)
          .post(url)
          .send({ username: 'test', password: 'wrong' });
        expect(response.statusCode).toBe(401);
      });

      it('should contain Set-Cookie in response.headers when successfully logged in', async () => {
        const response = await request(app)
          .post(url)
          .send({ username: 'test', password: 'test' });
        expect(response.headers['set-cookie']).toBeDefined();
        expect(response.statusCode).toBe(200);
      });

      it('should return 200 and set-cookie header should contain backendsession', async () => {
        const response = await request(app)
          .post(url)
          .send({ username: 'test', password: 'test' });
        const setCookieHeader: string = response.headers['set-cookie'][0];
        expect(setCookieHeader.split('=')[0]).toBe('backendsession');
      });
    });
    describe('DELETE', () => {
      it('should return 401 when not logged in', async () => {
        const response = await request(app)
            .delete(url)
            .send();
        expect(response.statusCode).toBe(401);
      })
    });
  });
  describe('/api/users', () => {
    const url = '/api/users';
    describe('GET', () => {
      it('should return 200 and a list of users', async () => {
        const response = await request(app)
            .get(url)
            .set('Cookie', await loginUser('test', 'test'));
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
      })
      it('should return 401 when not logged in', async () => {
        const response = await request(app).get(url);
        expect(response.statusCode).toBe(401);
      });
    });
  });
  describe('/api/info', () => {
    const url = '/api/info';
    describe('POST', () => {
      it('should return 401 when not logged in', async () => {
        const response = await request(app)
            .post(url)
            .send({firstName:'test', lastName:'test', userName:'test', password:'test'});
        expect(response.statusCode).toBe(401);
      });
    });
  });
  describe('/api/update/:id', () => {
    let url: string;
    beforeEach(async () => {
      const user = await User.create({
        userName: 'test',
        password: hashPassword('test'),
        firstName: 'test',
        lastName: 'test',
      });
      id = user.id;
      url = `/api/update/${id}`;
    });
    describe('PUT', () => {
      it('should return 401 when not logged in', async () => {
        const response = await request(app)
            .put(url)
            .send({firstName:'test2', lastName:'test2', userName:'test2', password:'test2'});
        expect(response.statusCode).toBe(401);
      });
    });
  });
});
