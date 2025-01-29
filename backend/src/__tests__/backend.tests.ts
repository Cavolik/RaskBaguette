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
  beforeEach(async () => {
    await User.create({
      userName: 'test',
      password: hashPassword('test'),
      firstName: 'test',
      lastName: 'test',
    });
  });
  describe('/api/login', () => {
    describe('POST', () => {
      it('should login to the app', async () => {
        const response = await request(app)
          .post('/api/login')
          .send({ username: 'test', password: 'test' });
        expect(response.statusCode).toBe(200);
      });

      it('should return 401 when wrong password', async () => {
        const response = await request(app)
          .post('/api/login')
          .send({ username: 'test', password: 'wrong' });
        expect(response.statusCode).toBe(401);
      });

      it('should contain Set-Cookie in response.headers when successfully logged in', async () => {
        const response = await request(app)
          .post('/api/login')
          .send({ username: 'test', password: 'test' });
        expect(response.headers['set-cookie']).toBeDefined();
        expect(response.statusCode).toBe(200);
      });

      it('should return 200 and set-cookie header should contain backendsession', async () => {
        const response = await request(app)
          .post('/api/login')
          .send({ username: 'test', password: 'test' });
        const setCookieHeader: string = response.headers['set-cookie'][0];
        expect(setCookieHeader.split('=')[0]).toBe('backendsession');
      });
    });
  });
  describe('/api/users', () => {
    const url = '/api/users';
    describe('GET', () => {
      it('should return 200 and a list of users', async () => {
        const response = await request(app).get(url).set('Cookie', await loginUser('test', 'test'));
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
      })
      it('should return 401 when not logged in', async () => {
        const response = await request(app).get(url);
        expect(response.statusCode).toBe(401);
      });
    });
  });
});
