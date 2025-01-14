import { ObjectId } from "mongoose";

export default class Product {
    constructor( public name: string, public price: number, public id?: ObjectId,) {
    }
}