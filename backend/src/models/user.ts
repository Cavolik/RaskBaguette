import { Schema, model } from 'mongoose';

interface Users {
    firstName: string,
    lastName: string,
    userName: string,
    password: string,
    orderHistory: undefined[]
}

const userSchema = new Schema<Users>({
    firstName: {
        type: String,
        required: [true, "First name should not be empty!"]
    },
    lastName: {
        type: String,
        required: [true, "Last name should not be empty!"]
    },
    userName: {
        type: String,
        required: [true, "Username should not be empty!"]
    },
    password: {
        type: String,
        required: [true, "Password should not be empty!"]
    },
    orderHistory: {
        type: Array,
        default: []
    }
}, {timestamps: true});

export const User = model<Users>('User', userSchema);
