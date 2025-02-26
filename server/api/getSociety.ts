import { MongoClient } from 'mongodb';


const uri = process.env.MONGODB_URI || '';
const client = new MongoClient(uri);

export default defineEventHandler(async (event) => {
    const { societyId } = await readBody(event);


    try {
        await client.connect();
        const db = client.db('FYH');
        const collection = db.collection('Societies');
        const data = await collection.find({ _id: societyId }).toArray();

        return { success: true, data: data[0] };
    } catch (error) {
        return { success: false, error: (error as any).message };
    } finally {
        await client.close();
    }
});