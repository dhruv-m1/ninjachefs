/*
    Actions for worker
*/

import utils from './utils.js';

const actions = {};

actions.cleanSuccessLogs = async(collection, olderThan) => {

    try {

        console.log('Trying to clean success logs...');

        let result = await collection.deleteMany({ 
            success: "true", 
            is_pending: false, 
            updatedAt: {
                $lt: new Date(new Date().getTime() - olderThan)
            }
        });

        console.log(`... Cleaned ${result.deletedCount} success logs.`);

    } catch (error) {

        console.log('[ERR] Unable to clean success logs:');
        console.log(error);

    }

}

actions.cleanHangingImages = async (collection, olderThan, env) => {
    
    try {
    
        console.log('Trying to clean hanging images...');
        let documents = await collection.find({ 
            success: "true", 
            is_pending: true, 
            updatedAt: {
                $lt: new Date(new Date().getTime() - olderThan)
            }
        });
        
        let count = 0;

        for (let document of documents) {
            
            if (document.img_url)	{

                let imageID = doc.img_url.split('/').pop();

                // Delete the image from cloudflare images
                
                utils.deleteImage(imageID, env);

                let result = await collection.deleteOne({ _id: doc._id });
                count++;
                
            }
        }

        console.log(`... Cleaned ${count} hanging images.`);

    } catch (error) {

        console.log('[ERR] Unable to clean hanging images:');
        console.log(error);

    }
}

actions.cleanUnsuccessfulLogs = async (collection, olderThan) => {
    
        try {
    
            console.log('Trying to clean unsuccessful logs...');

            let result = await collection.deleteMany({ 
                success: "false", 
                updatedAt: {
                    $lt: new Date(new Date().getTime() - olderThan)
                }
            });

            console.log(`... Cleaned ${result.deletedCount} unsuccessful logs.`);
    
        } catch (error) {
    
            console.log('[ERR] Unable to clean unsuccessful logs:');
            console.log(error);
    
        }
}

export default actions;