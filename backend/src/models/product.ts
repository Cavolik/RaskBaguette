import { Schema, model } from 'mongoose';

interface Products {
    product: string,
    price: number
}

const productSchema = new Schema<Products>({
    product: {
        type: String,
        required: [true, "Product name should not be empty"]
    },
    price: {
        type: Number,
        required: [true, "Price should not be empty"]
    }
}, {timestamps: true});

export const Product = model<Products>('Product', productSchema);
