/* 
    Service for fetching status of pending submissions
*/


const submissions = {};
const db = require('../config/db.config');

submissions.status = (id) => {
    return new Promise(async(resolve, reject) => {
        try {

            let submission = await db.PendingSubmission.findOne({ _id: id });

            resolve({code: 200, data: submission});
    
        } catch (error) {
            
            resolve({ code: 500, msg: "Could not retrive data from data store"});
    
        }
    });
}

module.exports = submissions;

// TODO: submissions.user() - list of pending & failed submissions for a particular user.