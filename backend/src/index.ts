import express, {Request, Response} from "express";
import { connectToMongoDB} from "./database";
import {User} from "./models/user";


const info: any[] = [];

const app = express();
connectToMongoDB().then();
app.use(express.json());

app.get("/api/info", (req: Request, res: Response<string[]>) => {
    res.status(200).json(info);
});

app.post("/api/info", async (req: Request, res: Response) => {
    const {firstName, lastName, userName, password} = req.body;

    if (!firstName || !lastName || !userName || !password) {
        throw new Error("Does not mach required user format");
    }

    const newUser = await User.create(req.body);
    res.status(201).json({user: newUser, msg: "User has been created"});
})

app.listen(8080, () => {
    console.log("start");

})
