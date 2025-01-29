import crypto from 'crypto';

const iterations = 10000;
const keyLength = 512;

export const hashPassword = (password: string) => {
  const salt = crypto.randomBytes(128).toString('base64'); //generate a random salt.
  return `${salt}:${crypto.pbkdf2Sync(password, salt, iterations, keyLength, 'sha512').toString('base64')}`; //hash the password with the salt and return the salt and the hash concatenated with a colon.
};

export const verifyHashedPassword = (password: string, hashedPassword: string) => {
  const [salt, hash] = hashedPassword.split(':'); //separate the salt and the hash from the hashed password string.
  return (
    hash === crypto.pbkdf2Sync(password, salt, iterations, keyLength, 'sha512').toString('base64') //compare the hash of the password with the hash in the hashed password string.
  );
};
