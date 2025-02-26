import { MongoClient } from 'mongodb';


const uri = process.env.MONGODB_URI || '';
const client = new MongoClient(uri);

export default defineEventHandler(async (event) => {
    const { societyId } = await readBody(event);


    try {
        await client.connect();
        const db = client.db('FYH');

        const eventCollection = db.collection('Events');
        const events = await eventCollection.find({ society: societyId }).toArray();

        const eventIds = events.map(event => event._id);

        const societyCollection = db.collection('Societies');
        const society = await societyCollection.findOne({ _id: societyId });

        if (!society) {
            return { success: false, error: "Society not found" };
        }

        if (eventIds.length === 0) {
            return { success: true, societyName: society, data: [] }; // No events found for the society
        }

        const userCollection = db.collection("Users");
        const users = await userCollection.find({
            "events.eventId": { $in: eventIds }
        }).toArray();

        const result = users.map(user => {
            const attendedCount = user.events.filter((e: any) =>
                eventIds.includes(e.eventId)
            ).length;
            return {
                userId: user._id,
                email: user.email,
                attendedEvent: attendedCount
            }
        })
            .sort((a, b) => b.attendedEvent - a.attendedEvent);
        return { success: true, data: result, societyName: society };
    } catch (error) {
        return { success: false, error: (error as any).message };
    } finally {
        await client.close();
    }
});