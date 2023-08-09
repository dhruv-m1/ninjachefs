/*
    Utility for accessing Open AI models
*/

const aiConfig = require('../config/ai.config');

const ai = {};

ai.gpt = ((inputBatch) => {
    return new Promise((resolve, reject) => {

        aiConfig.interface.createChatCompletion({

            model: aiConfig.models.gpt,
            messages: inputBatch
    
        }).then((res) => {
            const output = JSON.parse(res.data.choices[0].message.content);
            resolve(output);
        })

    })
})

module.exports = ai;