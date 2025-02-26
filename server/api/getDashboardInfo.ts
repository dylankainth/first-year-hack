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
        // const user = await collection
        //     .findOne

        // if (!user) {
        //     return { success: false, error: 'User not found' };
        // }

        // // for each event in user.events, get the event details from the Events collection
        // for (const event of user.events) {
        //     const eventDetails = await db.collection('Events').findOne({ _id: event.eventId });
        //     event.details = eventDetails;
        // }

        // // for each event in user.events, get the society details from the Societies collection
        // for (const event of user.events) {
        //     const societyDetails = await db.collection('Societies').findOne({ _id: event.details.society });
        //     event.details.societyDetails = societyDetails;
        // }

        // for each society in Societies collection, get the events from the Events collection with 'society' field as the society id
        const societiesCollection = db.collection('Societies');
        const societies = await societiesCollection.find({}).toArray();
        for (const society of societies) {
            const events = await db.collection('Events').find({ society: society._id }).toArray();
            society.events = events;
        }

        // count how many events each society has
        for (const society of societies) {
            society.eventCount = society.events.length;
        }

        // count how many events the user has attended by looking at the user.events array
        const user = await collection
            .findOne({ email })

        if (!user) {
            return { success: false, error: 'User not found' };
        }

        for (const society of societies) {
            society.userattendedEventCount = 0;
            for (const event of society.events) {
                if (user.events.find((e: any) => e.eventId === event._id)) {
                    society.userattendedEventCount++;
                }
            }
        }

        return { success: true, data: societies };


    } catch (error) {
        return { success: false, error: (error as any).message };
    } finally {
        await client.close();
    }

});