import jwt from 'jsonwebtoken';
import path from 'path'
import dotenv from "dotenv";
import User from '../models/userSchema';

dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

//todo, change not to any
export async function validateUser(req: Request | any): Promise<any> {
    try {
        const { authorization } = req.headers

        if (!authorization) return false;

        console.log(authorization)
        const userId = tokenToUserId(authorization);
        // console.log(userId);
        if (!userId) return false;

        const user = await User.findOne({ _id : userId });

        console.log('found user: ', user)
        if (!user) return false;

        return { userId, user };
    } catch (error) {
        throw error;
    }
}

export function tokenToUserId(token: string) {
    const SECRET_KEY = process.env.SECRET_KEY!;
    try {
        const decodedToken = jwt.verify(token, SECRET_KEY) as { _id: string };
        return decodedToken._id;
    } catch (error) {
        return undefined;
    }
}