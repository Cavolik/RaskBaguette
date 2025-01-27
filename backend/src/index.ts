import express, { Request, Response } from "express";
import { connectToMongoDB } from "./database";
import { User } from "./models/user";

/*
https://expressjs.com/en/resources/middleware/session.html
This is the conventional way of authenticating a client application to a backend server.
Install with npm i express-session --save, when using typescript we install the types with npm i @types/express-session --save-dev
 */
import session from 'express-session';

const app = express();
connectToMongoDB().then();

app.use(express.json());

/*
This is where we include the express-session middleware, it has to be included at the top so all the request handlers and other middleware that
requires the session object can access it.
 */
app.use(session({
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
    cookie: {secure: process.env.NODE_ENV==='production'} //so if we do not set the environment variable to production, the cookie will be sent over both HTTP and HTTPS
}));

app.get("/api/users", async (req: Request, res: Response) => {
    const users = await User.find();

    if (users?.length===0) {
        throw new Error("User list is empty");
    }

    res.status(200).json(users);
});

app.post("/api/login", async (req: Request, res: Response) => {
    const user = await User.find(req.body);

    res.status(200).json(user);
})

app.post("/api/info", async (req: Request, res: Response) => {
    const {firstName, lastName, userName, password} = req.body;

    if (!firstName || !lastName || !userName || !password) {
        throw new Error("Does not mach required user format");
    }

    const newUser = await User.create(req.body);
    res.status(201).json({user: newUser, msg: "User has been created"});
})

app.put("/api/update/:id", async (req: Request, res: Response) => {
    const id = req.params.id;

    const user = await User.findOneAndUpdate({_id: id}, req.body);
    res.status(200).json(user);
})

app.listen(8080, () => {
    console.log("start");

})
