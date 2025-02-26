export default defineEventHandler(async (event) => {


    // write the code here! 

    // use node.js "fetch" to make the requsts to those apis 

    //PLAN

    // get list of all student societies
    // for each student society get list of all events
    // for each event add it to events collection in mongodb

    // fetch the list of all KCL student societies
    const societiesResponse = await fetch('https://api.huzzle.app/api/v1/student_societies?page=1&per_page=100&university_ids=f21a775f-ea03-45c9-8fac-6607746936a5&verified=true');
    const societiesData = await societiesResponse.json();

    if (!societiesData || !societiesData.data) {
        throw new Error("Failed to fetch student societies");
    }

    let events = [];

    // Loop through each society and fetch its events
    for (const society of societiesData.data) {
        const eventsResponse = await fetch(`https://api.huzzle.app/api/v1/touchpoints?touchpointable_type=Event&creatable_for_ids=${society.id}&with_details=true&sort_by=created_at&sort_order=desc&page=1&per_page=10`);
        const eventsData = await eventsResponse.json();

        if (eventsData.data) {
            events.push(...eventsData.data);
        }
    }



    return {
        "Fetched events:": events
    }
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