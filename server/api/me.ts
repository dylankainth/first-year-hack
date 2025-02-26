import { MongoClient } from 'mongodb';
import jwt from 'jsonwebtoken';

const uri = process.env.MONGODB_URI || '';
const client = new MongoClient(uri);

export default defineEventHandler(async (event) => {

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

        // find the user with this email in the User's collection
        const user = await collection
            .findOne({ email })


        if (!user) {
            return { success: false, error: 'User not found' };
        }

        // for each event in user.events, get the event details from the Events collection
        for (const event of user.events) {
            const eventDetails = await db.collection('Events').findOne({ _id: event.eventId });
            event.details = eventDetails;
        }

        return { success: true, data: user };




    } catch (error) {
        return { success: false, error: (error as any).message };
    } finally {
        await client.close();
    }

});