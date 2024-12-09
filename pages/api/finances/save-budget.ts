import type { NextApiRequest, NextApiResponse } from "next";
import Budget from "@/app/models/BudgetSchema";
import connectToDatabase from "@/app/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const normalizeFinances = (finances: Record<string, Record<string, any>>) => {
    return new Map(
        Object.entries(finances).map(([category, sources]) => [
            category,
            new Map(Object.entries(sources))
        ])
    );
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { finances } = req.body;
        const session = await getServerSession(req, res, authOptions);

        if (!session) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const userId = session.userId;

        if (!userId || !finances) {
            return res.status(400).json({ message: "Missing required fields.(user id/finance data)"});
        }

        try {
            await connectToDatabase();

            const normalizedFinances = normalizeFinances(finances);

            const existingBudget = await Budget.findOne({ user_id: userId });

            if (existingBudget) {
                existingBudget.finances = normalizedFinances;
                await existingBudget.save();
                return res.status(200).json({ message: "Budget updated successfully." });
            } else {
                const newBudget = new Budget({ user_id: userId, normalizedFinances });
                await newBudget.save();
                return res.status(201).json({ message: "Budget created successfully" });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error." });
        }
    } else {
        res.status(405).json({ message: "Method not allowed." });
    }
}