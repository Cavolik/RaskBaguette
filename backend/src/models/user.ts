import { ObjectId } from "mongoose";

export default class User {
    constructor( public firstName: string, public lastName: string, public password: string, public orderHistory: any[] = [], public id?: ObjectId,) {
    }
}