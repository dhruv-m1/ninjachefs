/*
    OpenAI SDK Setup
*/

import { OpenAIApi, Configuration } from 'openai';

// API Config
const OpenAI = new OpenAIApi(
    new Configuration({
        apiKey: process.env.OPENAI_KEY
    })
)

// exporting relavant config properties & interface
const aiConfig = {};

aiConfig.models = {
    gpt: "gpt-3.5-turbo"
}

aiConfig.interface = OpenAI;

export default aiConfig;