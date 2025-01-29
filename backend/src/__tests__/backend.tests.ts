import request from 'supertest';
import { app } from '../index';

describe('Backend tests', () => {
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
        console.log(response.headers['set-cookie']);
        expect(response.statusCode).toBe(200);
        expect(response.headers['set-cookie']).toBeDefined();
      });

      it('should return 200 and set-cookie header should contain backendsession', async () => {
        const response = await request(app)
          .post('/api/login')
          .send({ username: 'test', password: 'test' });
        const setCookieHeader: string = response.headers['set-cookie'][0];
        console.log(setCookieHeader);
        expect(setCookieHeader.split('=')[0]).toBe('backendsession');
      });
    });
  });
});
