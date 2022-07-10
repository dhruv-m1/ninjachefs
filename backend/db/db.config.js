/*
    Database Setup
*/

require('dotenv').config();
const mongoose = require("mongoose");

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
    chef: {
        type: String,
        required: true
    },
    preptime: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false
    },
    preplist: {
        type: Array,
        required: false
    },
    steps: {
        type: Array,
        required: true
    }
});

db.Recipie = mongoose.model("Recipie", recipeSchema);

const imgSchema = new mongoose.Schema({
    recipeId: {
        type: String,
        required: true,
        unique: true
    },
    thumbnail: {
        type: Buffer,
        required: true
    },
    format: {
        type: String,
        required: true
    }
});

db.Img = mongoose.model("Img", imgSchema);

// Export

module.exports = db;