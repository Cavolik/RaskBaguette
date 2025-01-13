import express, {Request, Response} from "express";
import {connectToMongoDB} from "./database";

const info: any[] = [];

const app = express();
app.use(express.json());

app.get("/api/info", (req: Request, res: Response<string[]>) => {
    res.status(200).json(info);
});

app.post("/api/info", (req: Request, res: Response) => {
    info.push(req.body)
    console.log(info);
    res.status(200);
})

connectToMongoDB();

app.listen(8080, () => {
    console.log("start");
})
