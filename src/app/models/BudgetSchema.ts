import mongoose, { Schema, Document, Types } from "mongoose";

export interface IBudget extends Document {
    user_id: Types.ObjectId;
    finances: {
        [category: string]: {
            [source: string]: number | string;
        };
    };
    created_at: Date;
    updated_at: Date;
}

const BudgetSchema: Schema<IBudget> = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    finances: {
        type: Map,
        of: {
            type: Map,
            of: Schema.Types.Mixed,
        },
        default: {}
    },
}, { timestamps: true });

const Budget = mongoose.models.Budget || mongoose.model<IBudget>("Budget", BudgetSchema);

export default Budget;