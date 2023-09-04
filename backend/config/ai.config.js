/*
    OpenAI SDK Setup
*/

const openAI = require('openai');

// API Config
const OpenAI = new openAI.OpenAIApi(
    new openAI.Configuration({
        apiKey: process.env.OPENAI_KEY
    })
)

// exporting relavant config properties & interface
const aiConfig = {};

aiConfig.models = {
    gpt: "gpt-3.5-turbo"
}

aiConfig.interface = OpenAI;

module.exports = aiConfig;