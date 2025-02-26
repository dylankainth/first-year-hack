import { MongoClient } from 'mongodb';
import jwt from 'jsonwebtoken';

const uri = process.env.MONGODB_URI || '';
const client = new MongoClient(uri);

export default defineEventHandler(async (event) => {
    const { eventId, image } = await readBody(event);

    const cookies = parseCookies(event);


    const authCookie = cookies['auth_token'];

    if (!authCookie) {
        throw createError({ statusCode: 401, statusMessage: 'Authorization cookie is missing or invalid' });
    }

    // Get the token part from the cookie
    const token = authCookie;

    // get email from token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as unknown as { email: string };

    const email = decoded.email;





    try {
        await client.connect();
        const db = client.db('FYH');
        const collection = db.collection('Users');


        // if a user is not found with this email , create a new user with this email
        const user = await collection
            .find({ email })
            .toArray();

        if (user.length === 0) {
            await collection.insertOne({ email, events: [] as { eventId: any; image: any }[] });
        }

        // add the event to the user's events
        await collection.updateOne(
            { email },
            { $push: { events: { eventId, image } } as any }
        );

    } catch (error) {
        return { success: false, error: (error as any).message };
    } finally {
        await client.close();
    }

    return { success: true };

});