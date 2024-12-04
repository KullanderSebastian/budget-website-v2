import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/app/lib/mongodb";
import Budget from "@/app/models/BudgetSchema";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const session = await getServerSession(req, res, authOptions);

        if (!session) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const userId = session.userId;

        try {
            await connectToDatabase();

            const budget = await Budget.findOne({ user_id: userId });

            if (!budget) {
                return res.status(404).json({ message: "Budget not found for the user "});
            }

            return res.status(200).json({ finances: budget.finances });
        } catch (error) {
            console.error("Error fetching budget: ", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    } else {
        res.status(405).json({ message: "Method not allowed." });
    }
}