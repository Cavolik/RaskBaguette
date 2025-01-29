import crypto from 'crypto';

const iterations = 10000;
const keyLength = 512;

export const hashPassword = (password: string) => {
  const salt = crypto.randomBytes(128).toString('base64');
  return `${salt}:${crypto.pbkdf2Sync(password, salt, iterations, keyLength, 'sha512').toString('base64')}`;
};

export const verifyHashedPassword = (password: string, hashedPassword: string) => {
  const [salt, hash] = hashedPassword.split(':');
  return (
    hash === crypto.pbkdf2Sync(password, salt, iterations, keyLength, 'sha512').toString('base64')
  );
};
