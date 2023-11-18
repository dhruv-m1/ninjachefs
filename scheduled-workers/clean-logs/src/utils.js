/*
    Utils 
*/

const utils = {};

utils.removeImage = (imageId, env) => {

    return new Promise(async (resolve, reject) => {

        try {
            const url = `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ID}/images/v1/${imageId}`;

            await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${env.CLOUDFLARE_TOKEN}`
                }
            });

            resolve();

        } catch (e) {

            console.error(e);
            reject();
        }
    });

}

export default utils;