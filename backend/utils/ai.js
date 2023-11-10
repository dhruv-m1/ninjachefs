/*
    Utility for accessing Open AI models
*/

import aiConfig from '../config/ai.config.js';

const ai = {};

ai.gpt = ((inputBatch) => {
    return new Promise((resolve, reject) => {

        aiConfig.interface.createChatCompletion({

            model: aiConfig.models.gpt,
            messages: inputBatch,
            temperature: 0
    
        }).then((res) => {
            const output = JSON.parse(res.data.choices[0].message.content);
            resolve(output);
        }).catch((err) => {
            console.log("Failed to generate or parse output from GPT-3.")
            console.log(err)
            reject(err);
        })

    })
})

ai.dalle = ((prompt) => {
    return new Promise((resolve, reject) => {

        aiConfig.interface.createImage({
            prompt: prompt,
            n: 1,
            size: "1024x1024"
        }).then((res) => {
            const output = res.data.data;
            resolve(output);
        })

    })
})

export default ai;