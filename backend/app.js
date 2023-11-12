/*
    Entrypoint - NinjaChefs Backend
*/

import express from 'express';
import { Clerk } from '@clerk/clerk-sdk-node';

const port = process.env.PORT || 8080;
const host = process.env.HOST || '127.0.0.1';

import recipes from './services/recipes.js';
import search from './services/search.js';

import submissions from './services/submissions.js'

import db from './config/db.config.js';
const app = express();

import multer from 'multer';
import {CloudflareStorage} from 'multer-cloudflare-storage';
const clerk = new Clerk({ apiKey: process.env.CLERK_API_KEY });

let startTime = null;
// Universal Middleware

app.use(express.json({limit: '50mb'}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'accept, authorization, content-type, x-requested-with');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

// Utilities

const unauthenticated = (res) => {
    res.statusCode = 401;
    res.json({code: 401, msg: 'session expired or invalid'});
}

const upload = multer({
    storage: new CloudflareStorage(process.env.CLOUDFLARE_ID, process.env.CLOUDFLARE_TOKEN)
}).single("image");

// Endpoints

app.get('/status',async(req, res) => {

    if (startTime) {
        res.json({code: 200, name: 'NinjaChefs + AI (API)', status: `Operational`, startTime: `${startTime.toLocaleString('en-CA')} (Server Time - UTC)`});
    } else {
        res.statusCode = 500;
        res.json({code: 500, name: 'NinjaChefs + AI (API)', status: `Requires Attention`});
    }

})

app.get('/api/v1/recipes/:skip/:limit', async(req, res) => {

    const retrivedData = await recipes.get({skip: req.params.skip, limit: req.params.limit});
    res.statusCode = retrivedData.code;

    res.json(retrivedData.data);

})

app.get('/api/v1/recipes/:idx',async(req, res) => {

    const retrivedData = await recipes.get({ idx: req.params.idx });
    res.statusCode = retrivedData.code;

    res.json(retrivedData.data);

})

app.post('/api/v1/recipes', clerk.expressWithAuth({}), async(req, res) => {
    
    if (!req.auth.sessionId) return unauthenticated(res);

    const user = await clerk.users.getUser(req.auth.userId);
    req.body.author = `${user.firstName} ${user.lastName}`;
    req.body.userId = user.id;

    const response = await recipes.add(req.body);
    res.statusCode = response.code;
    res.json(response);

})

app.put('/api/v1/recipes', clerk.expressWithAuth({}), async(req, res) => {
    
    if (!req.auth.sessionId) return unauthenticated(res);

    const user = await clerk.users.getUser(req.auth.userId);
    req.body.author = `${user.firstName} ${user.lastName}`;
    req.body.userId = user.id;

    const response = await recipes.update(req.body);
    res.statusCode = response.code;
    res.json(response);

})

app.post('/api/v1/recipes/images/upload', clerk.expressWithAuth({}), async(req, res) => {

    if (!req.auth.sessionId) return unauthenticated(res);

    upload(req, res, async(err) => {
        if (err instanceof multer.MulterError) {
            res.statusCode = 406;
            res.json({code: 406, msg: "UNEXPECTED FILE: Please ensure the file is an image file & less than 10MB.", code: err.code});
            return;
        } else if (err) {
            console.log(err);
            res.statusCode = 500;
            res.json({code: 500, msg: "Internal Server Error, Please try again later.", code: err.code});
            return;
        }

        const response = await recipes.addImage(req.file);
        res.statusCode = response.code;
        res.json(response);
    })

})

app.put('/api/v1/recipes/images/upload/:idx', clerk.expressWithAuth({}), async(req, res) => {

    if (!req.auth.sessionId) return unauthenticated(res);

    upload(req, res, async(err) => {

        if (err instanceof multer.MulterError) {
            res.statusCode = 406;
            res.json({code: 406, msg: "UNEXPECTED FILE: Please ensure the file is an image file & less than 10MB.", code: err.code});
            return;
        } else if (err) {

            console.log(err);
            res.statusCode = 500;
            res.json({code: 500, msg: "Internal Server Error, Please try again later.", code: err.code});
            return;
        }

        const response = await recipes.updateImage(req.file, req.params.idx, req.auth.userId);
        res.statusCode = response.code;
        res.json(response);
    })

})

app.delete('/api/v1/recipes/:idx', clerk.expressWithAuth({}), async(req, res) => {

    if (!req.auth.sessionId) return unauthenticated(res);
    
    const response = await recipes.delete(req.params.idx);
    res.statusCode = response.code;
    res.json(response);

})

app.get('/api/v1/recipes/user/:skip/:limit', clerk.expressWithAuth({}), async(req, res) => {

    if (!req.auth.sessionId) return unauthenticated(res);

    const retrivedData = await recipes.getByUser({userId: req.auth.userId, skip: req.params.skip, limit: req.params.limit});
    res.statusCode = retrivedData.code;

    res.json(retrivedData.data);

})

app.get('/api/v1/search/:skip/:limit',async(req, res) => {

    const filters = (req.query.diet) ? {diet : req.query.diet}: {};
    const retrivedData = await search.query(req.query.q, filters, req.params.skip, req.params.limit);
    console.log(req.query.q);
    res.statusCode = retrivedData.code;

    res.json(retrivedData.data);

})

app.get('/api/v1/submissions/:id', async(req, res) => {

    //if (!req.auth.sessionId) return unauthenticated(res);
    
    const retrivedData = await submissions.status(req.params.id);
    res.statusCode = retrivedData.code;

    res.json(retrivedData.data);

})

app.listen(port, host, async() => {
    console.log(`\x1b[33m→ Connecting to Database...\x1b[0m`)
    await db.connect();
    console.log(`\x1b[32m → Connected.\x1b[0m`)
    console.log(`\x1b[32mNinjaChefs API listening on port ${port}\x1b[0m`)
    startTime = new Date();
})