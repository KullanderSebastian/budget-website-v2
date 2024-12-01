import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/app/lib/mongodb";
import User from "@/app/models/UserSchema";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase();

    if (req.method === "POST") {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "Email is already in use" });
        }

        return res.status(200).json({ message: "Email is available" });
    }

    return res.status(405).json({ message: "Method not allowed" });
}