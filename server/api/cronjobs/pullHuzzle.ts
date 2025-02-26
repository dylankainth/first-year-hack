import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || '';
const client = new MongoClient(uri);

export default defineEventHandler(async (event) => {

    const societiesResponse = await fetch('https://api.huzzle.app/api/v1/student_societies?page=1&per_page=100&university_ids=f21a775f-ea03-45c9-8fac-6607746936a5&verified=true');
    const societiesData = await societiesResponse.json();

    if (!societiesData || !societiesData.data) {
        throw new Error("Failed to fetch student societies");
    }

    let events = [];
    let societies = [];

    for (const society of societiesData.data) {
        const eventsResponse = await fetch(`https://api.huzzle.app/api/v1/touchpoints?touchpointable_type=Event&creatable_for_ids=${society.id}&with_details=true&sort_by=created_at&sort_order=desc&page=1&per_page=10`);
        const eventsData = await eventsResponse.json();

        societies.push({
            name: society.attributes.name,
            _id: society.attributes.id
        })

        // Extract required fields and push them to the events array
        if (eventsData?.data) {
            for (const event of eventsData.data) {
                events.push({
                    society: society.attributes.id,
                    _id: event.attributes.id,
                    name: event.attributes.title,
                    date: event.attributes.start_date ?? "N/A",
                    location: event.attributes.place.data.attributes ?? "Unknown",
                    description: event.attributes.meta_description
                });
            }
        }

    }


    try {
        await client.connect();
        const db = client.db('FYH');
        const collection = db.collection('Events');

        // Insert all events into the collection
        await collection.insertMany(events);

        const collection2 = db.collection('Societies');
        await collection2.insertMany(societies);

    } catch (error) {
        return { success: false, error: (error as any).message };
    } finally {
        await client.close();
    }

    return "worker completed";
})

/* go to huzz pick up all kcl events then put it in mongo db, in collection called events
Must find way to connect to Huzzle, then also db
for each society write for loop*/


// https://api.huzzle.app/api/v1/student_societies?page=1&per_page=100&university_ids=f21a775f-ea03-45c9-8fac-6607746936a5&verified=true 
// gives a list of all student societies at kcl

// https://api.huzzle.app/api/v1/touchpoints?touchpointable_type=Event&creatable_for_ids=${society.id}&with_details=true&sort_by=created_at&sort_order=desc&page=1&per_page=10`
// gives a list of all events for a society

// e.g. 
// https://api.huzzle.app/api/v1/touchpoints?touchpointable_type=Event&creatable_for_ids=823e96d7-14eb-49bb-b7b5-4288382d47cd&with_details=true&sort_by=created_at&sort_order=desc&page=1&per_page=10`
// all the events for king's business club