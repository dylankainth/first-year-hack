import { MongoClient } from 'mongodb';


const uri = process.env.MONGODB_URI || '';
const client = new MongoClient(uri);

export default defineEventHandler(async (event) => {
    const { eventId } = await readBody(event);


    try {
        await client.connect();
        const db = client.db('FYH');
        const collection = db.collection('Events');
        const data = await collection.find({ _id: eventId }).toArray();

        // for each event, add a new field called 'societyname' with the society name, fetch it using the society id
        const societiesCollection = db.collection('Societies');
        for (const event of data) {
            const society = await societiesCollection.findOne({ _id: event.society });
            event.societyname = society ? society.name : 'Unknown';
        }

        return { success: true, data: data[0] };
    } catch (error) {
        return { success: false, error: (error as any).message };
    } finally {
        await client.close();
    }
});