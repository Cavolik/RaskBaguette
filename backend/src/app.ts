import express, { NextFunction, Request, Response } from 'express';
import { User } from './models/user';

/*
https://expressjs.com/en/resources/middleware/session.html
This is the conventional way of authenticating a client application to a backend server.
Install with npm i express-session --save, when using typescript we install the types with npm i @types/express-session --save-dev
 */
import session from 'express-session';
import { verifyHashedPassword } from './utils/authUtils';
import request from "supertest";
const checkLogin = (req: Request, res: Response) => {
    if (req.session && !req.session.userId) {
      res.status(401).send();
      return false;
    }
    return true;
};

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

app.get('/api/users', async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!checkLogin(req, res)) return;
    const users = await User.find();
    res.status(200).json(users);
  } catch (e:unknown) {
    return next(e);
  }
});

declare module 'express-session' {
  interface SessionData {
    userId: string;
    views: number;
  }
}

app.post('/api/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userName, password } = req.body; // we extract username and password from the request body. We have typed the request object and specified how the request body looks.
    //find the user
    const user = await User.findOne({userName: userName});
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
    if (!checkLogin(req, res)) return;
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

app.post('/api/info', async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!checkLogin(req, res)) return;
    const {firstName, lastName, userName, password} = req.body;

    if (!firstName || !lastName || !userName || !password) {
      throw new Error('Does not mach required user format');
    }

    const newUser = await User.create(req.body);
    res.status(201).json({ user: newUser, msg: 'User has been created' });
  } catch (error: unknown) {
    return next(error);
  }
});

app.put('/api/update/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!checkLogin(req, res)) return;
    const id = req.params.id;

    const user = await User.findOneAndUpdate({_id: id}, req.body);
    res.status(200).json(user);
  } catch (error: unknown) {
    return next(error);
  }
});

app.get('/api/session-status', async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!checkLogin(req, res)) return;
    res.status(200).json({userId: req.session.userId});
  } catch (error: unknown) {
    return next(error);
  }
});

app.get('/api/current-user', async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!checkLogin(req, res)) return;
    const user = await User.findOne({_id: req.session.userId});

    //if statement will always be true, since it cannot be reached without user existing
    if (user) {
      const returnUser = {firstName: user.firstName, lastName: user.lastName, orderHistory: user.orderHistory};
      res.status(200).json(returnUser);
    }
  } catch (error: unknown) {
    return next(error);
  }
});
