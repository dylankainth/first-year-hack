import { MongoClient } from 'mongodb';


const uri = process.env.MONGODB_URI || '';
const client = new MongoClient(uri);

export default defineEventHandler(async () => {
    try {
        await client.connect();
        const db = client.db('FYH');
        const collection = db.collection('Events');
        const data = await collection.find({}).toArray();
        return { success: true, data };
    } catch (error) {
        return { success: false, error: (error as any).message };
    } finally {
        await client.close();
    }
});