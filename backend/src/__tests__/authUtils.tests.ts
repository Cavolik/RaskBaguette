import { hashPassword, verifyHashedPassword } from '../utils/authUtils';

describe('Auth util tests', () => {
  it('should generate a different hash for same password', async () => {
    const password = 'password';
    const hash1 = hashPassword(password);
    const hash2 = hashPassword(password);
    expect(hash1).not.toBe(hash2);
  });

  it('should verify password vs the hashed password', async () => {
    const password = 'password';
    const hashedPassword = hashPassword(password);
    console.log(hashedPassword.split(':')[0]);
    const result = verifyHashedPassword(password, hashedPassword);
    expect(result).toBe(true);
  });

  it('should generate a password', async () => {
    console.log(hashPassword('test'));
    console.log(hashPassword('test2'));
  });
});
