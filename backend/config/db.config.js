/*
    Database Setup
*/

import 'dotenv/config';
import mongoose from 'mongoose';

const db = {};

// Establish new connection with MongoDB Instance

db.connect = async() => {

    return new Promise(async(resolve, reject) => {

        try {

            await mongoose.connect(process.env.MONGODB_SRV);
            resolve();


        } catch (e) {

            console.error(e);
            reject();
        }

    });
}


// Schemas & Models

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    cooking_time: {
        type: Number,
        required: true
    },
    diet: {
        type: String,
        required: true
    },
    img_url: {
        type: String,
        required: false
    },
    ingredients: {
        type: Object,
        required: false
    },
    steps: {
        type: Array,
        required: true
    },
    allergies: {
        type: Array,
        required: true
    },
    intro: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    health_score: {
        type: Number,
        required: true
    },
    health_reason: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: false
    }
});

db.Recipe = mongoose.model("Recipe", recipeSchema);

const pendingSubmissionSchema = new mongoose.Schema({
    recipeId: {
        type: String,
        required: false
    },
    img_url: {
        type: String,
        required: false
    },
    is_pending: {
        type: Boolean,
        required: true
    },
    success: {
        type: String,
        required: true
    },
    stage: {
        type: String,
        required: true
    },
    log: {
        type: String,
        required: false
    }
}, { timestamps: true });

db.PendingSubmission = mongoose.model("PendingSubmission", pendingSubmissionSchema);

// Export

export default db;