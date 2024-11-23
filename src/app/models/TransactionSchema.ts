import mongoose, { Document, Model, Schema } from "mongoose";
import { categories } from "../data/categories";

const categoryKeys: string[] = Object.keys(categories);
const sourceKeys: string[] = Object.values(categories).flatMap((category) => 
    Object.keys(category.sources)
);

export interface ITransaction extends Document {
    user_id: mongoose.Types.ObjectId;
    amount: number;
    currency: string;
    category: string;
    source: string;
    type: "income" | "expense";
    date: Date;
    recurring: boolean;
    created_at: Date;
    updated_at: Date;
}

const TransactionSchema: Schema<ITransaction> = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    amount: {
        type: Number,
        min: 0,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: categoryKeys,
        required: true
    },
    source: {
        type: String,
        required: true,
        enum: sourceKeys
    },
    type: {
        type: String,
        enum: ["income", "expense"],
        required: true
    },
    date: {
        type: Date,
        required: false
    },
    recurring: {
        type: Boolean,
        required: true
    },
}, { timestamps: true });

const Transaction: Model<ITransaction> = mongoose.models.Transaction || mongoose.model<ITransaction>("Transaction", TransactionSchema);
export default Transaction;