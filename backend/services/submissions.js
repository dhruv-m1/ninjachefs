/* 
    Service for fetching status of pending submissions
*/


const submissions = {};
import db from "../config/db.config.js";

submissions.status = (id) => {
    return new Promise(async(resolve) => {
        try {

            let submission = await db.PendingSubmission.findOne({ _id: id });

            resolve({code: 200, data: submission});
    
        } catch (error) {
            
            resolve({ code: 500, msg: "Could not retrive data from data store"});
    
        }
    });
}

export default submissions;