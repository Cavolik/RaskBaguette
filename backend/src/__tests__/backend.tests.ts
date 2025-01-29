import request from 'supertest';
import { app } from '../app';
import TestDb from '../utils/testDb';
import { User } from '../models/user';
import { hashPassword } from '../utils/authUtils';

const testDb = new TestDb();

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
  describe('/api/login', () => {
    beforeEach(async () => {
      await User.create({
        userName: 'test',
        password: hashPassword('test'),
        firstName: 'test',
        lastName: 'test',
      });
    });

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
});
