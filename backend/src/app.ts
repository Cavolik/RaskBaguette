import express, { NextFunction, Request, Response } from 'express';
import { User } from './models/user';

/*
https://expressjs.com/en/resources/middleware/session.html
This is the conventional way of authenticating a client application to a backend server.
Install with npm i express-session --save, when using typescript we install the types with npm i @types/express-session --save-dev
 */
import session from 'express-session';
import { verifyHashedPassword } from './utils/authUtils';

export const app = express();

app.use(express.json());

/*
This is where we include the express-session middleware, it has to be included at the top so all the request handlers and other middleware that
requires the session object can access it.
 */
app.use(
  session({
    name: 'backendsession',
    secret: process.env.SESSION_SECRET || 'dev-secret', //the key that the session will be hashed with to make it unique for this server
    resave: false, //if the session should be saved to the store even if it wasn't modified
    /*
  saveUninitialized: true: The session will be saved to the session store even if it is new and not modified.
  This can be useful for implementing login sessions, reducing server storage usage, or complying with laws that
  require consent before setting a cookie.
  saveUninitialized: false: The session will not be saved to the session store unless it is modified. This can help
  reduce storage usage and comply with privacy laws by not storing sessions for unauthenticated users.
   */
    saveUninitialized: true,
    /*
       * true: The cookie will only be sent over HTTPS, ensuring that it is not transmitted over unencrypted HTTP
               connections. This is recommended for production environments to enhance security.
       * false: The cookie can be sent over both HTTP and HTTPS. This is useful for development environments where
                HTTPS might not be set up.
   */
    cookie: { secure: process.env.NODE_ENV === 'production' }, //so if we do not set the environment variable to production, the cookie will be sent over both HTTP and HTTPS
  })
);

app.get('/api/users', async (req: Request, res: Response) => {
  const users = await User.find();

  if (users?.length === 0) {
    throw new Error('User list is empty');
  }

  res.status(200).json(users);
});

const userDatabase = [
  {
    id: 'id1',
    username: 'test',
    password:
      '8Gnhiz3mhf2YrPx/ws+fnpvmUVyi0RSp7AmDGL/aui4P+9CUhEmIzPK0IaQtuhdjWaYJDdRtvutjXKPar/oeasD55KZRCKFMkTLFQjs5N90fsBe5o6EOJ9DXxhgLQc/UOAjpeth9cHiOy3NxpL8qgWTgCWZRTWk9grzHD5y0+cE=:gKvdYWujo142pvoRqBtgUHzyo5r9kKkVb7VdbdtCFRSxYb4ZpcOQtanLFz1c9sCrYk3E2SI3sJabPJN16ZmZsF0hD2HJJjDIER9LoZx4HQZoBo/F4f0NLoc1kuHq+IrM2kkoYrBIQFA1umExAl7pUuKXsBcJCZU7n8ix+6kgJhSd3yp6I4vKNOMiQDjyBuQTil1FLaW1mxOYZ1rttS6zlaGp93jWLqxjps59/UsQMO2MRFetGPPRzKhBnYE3iT52Irw2YGqs2rg1VA7MvxT65hQmsmsEcE74Jg9glMe53RW+ETqmCDjD2lPfLPLVQWq6CT+X5aCsZzaDxEm4tkjPDtb6f8hH5fx+PnwtLK4HW12iO0GoCKEzcK4qetEBSjKjms6yfJFUKIR6g4hV2JTEwbLFAJ6HpVS7SpY00l27zQPelqgXFIJcU+eyPY2i+uyG+y/D6bToCP8OQ6c2MpXCd/a9hS/30rcHrJJMdZr+YBwlIPZyjcF1Wl/iLp5KGaRYhNtICaOhWGYybgVA/Ov4RLnNRLBaRsNfLKR4QSxGFDpNBVd/RyJ0NWvpo8tNJkYO6bcvKJtXnVLa7rqT2Pw864z3wyguk9X0OPGhgNzrDdUIrUyBTvNI/vDe+oIb5h7dodlZUb5QFU9eX8MhcA6PuffKbxk82nAodgnexCEua2c=',
  },
  {
    id: 'id2',
    username: 'test2',
    password:
      'F3p/aAZOfgG6EqaZwSIz7mKO5zw34dxUnap78CZa+UbF5/EyYL5WJy5XiXd7d5paOREsLHj1ab5SV9f6sAi5Gl8yWZerbCl+LaP3ufhjZxAe5Sgoo7MFY1R1pFmzKxebhrd3ahLsLHerGjMEo9NaDwOsuOUGdLMofo7PLurZJj0=:cnufLXQxebBbF6AAw7ct5//n6+EbZFNSCr2wARsluQ1XeGdw9BQI08d5SX3ko4olnSEAybdiUq1ROLss4XSZmbrr4TRpYG2agrrUgekMJdVtumjSSkyCHE9OEpIZ1eOA/KaojCEZRN4UCuERWbW6GVmevm0b4Z78sSXjkBQ2eBX/YxrIyd2MIuI/ES4KntqnhyxtO6xxIplQvfVJrRO//ZzjDby5jggO7a4rSzxNKT78GY8zT5RQ6H+ma71D44UttZMLDuYb+2NOtyaQO67qKKiw0kPAtSCf7E2IK1XrjyLvOvToXXpAebkRhrT6vGruRJDUUqISn7AR6byiPOBe3Kt2epZl0gfzY00c7KZTM2BDtIwEJPinptUHIKwtncpuFxU4Iahy8dGTSiiKVD8VHWAmg7LukWG5kXBf0++9/X9Pdk3BVZGtQcbBsnA1malKTJ50IDZDA3a1eTHZEaF9Ta1tSH1/iONA3EJ3uAwIa99r2dFnOLv8NzdhWlNJjzp2ILIJxQR6HBXxOyan6HMa9FIlaVxbSmnkI9dx1TVOztkqZGE9CozY1pIbBqXJlK4Bmj9HGvsDDmdIReP/HeU8CnShoGhH0zqtA+re4OgbPIuaAXfOKzP2/npG9XkmlGVjL00zCpUUZMCkNeIUJG/m8I7Moqnz511uzeDpPDP/eNo=',
  },
];

declare module 'express-session' {
  interface SessionData {
    userId: string;
    views: number;
  }
}

app.post('/api/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body; // we extract username and password from the request body. We have typed the request object and specified how the request body looks.
    //find the user
    const user = userDatabase.find((user) => user.username === username);
    if (!user || !verifyHashedPassword(password, user.password)) {
      //if no user is found or the user.password is not equal to password in the body, we return 401
      return res.status(401).json({ msg: 'Unauthorized' });
    }
    req.session.userId = user.id;
    return res.status(200).json({ msg: 'Logged in' });
  } catch (error: unknown) {
    // we type everything, error is unknown so we type it as such so we have to assert what it is later.
    return next(error); //if we invoke next(error) we are telling express that this error must be passed to a error handler.
  }
});

app.delete('/api/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.session.destroy((error: unknown) => {
      if (error) {
        return res.status(500).json({ msg: 'Logout failed' });
      }
      res.clearCookie('connect.sid'); // this instructs the browser to delete the cookie, default name for express session cookie is connect.sid;
      return res.status(200).json({ msg: 'Logged out successfully' });
    });
  } catch (error: unknown) {
    return next(error);
  }
});

app.post('/api/info', async (req: Request, res: Response) => {
  const { firstName, lastName, userName, password } = req.body;

  if (!firstName || !lastName || !userName || !password) {
    throw new Error('Does not mach required user format');
  }

  const newUser = await User.create(req.body);
  res.status(201).json({ user: newUser, msg: 'User has been created' });
});

app.put('/api/update/:id', async (req: Request, res: Response) => {
  const id = req.params.id;

  const user = await User.findOneAndUpdate({ _id: id }, req.body);
  res.status(200).json(user);
});
