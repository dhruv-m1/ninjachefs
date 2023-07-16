/*
    Entrypoint - NinjaChefs Backend
*/

const express = require('express');
const clerk = require('@clerk/clerk-sdk-node');

const port = process.env.PORT || 8080;
const host = process.env.HOST || '127.0.0.1';

const recipes = require("./services/recipes");
const db = require('./db/db.config');

const app = express();

// Universal Middleware

app.use(express.json({limit: '50mb'}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'accept, authorization, content-type, x-requested-with');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.setHeader('Access-Control-Allow-Origin', '*');

    next();
});

// Utilities

const unauthenticated = (res) => {
    res.statusCode = 401;
    res.json({code: 401, msg: 'session expired or invalid'});
}

// Endpoints

app.get('/status',async(req, res) => {

    res.json({status: 'UP'});

})

app.get('/api/v1/recipes',async(req, res) => {

    const retrivedData = await recipes.get();
    res.statusCode = retrivedData.code;

    res.json(retrivedData.data);

})

app.get('/api/v1/recipes/:idx',async(req, res) => {

    const retrivedData = await recipes.get({ idx: req.params.idx });
    res.statusCode = retrivedData.code;

    res.json(retrivedData.data);

})

app.post('/api/v1/recipes', clerk.ClerkExpressRequireAuth({}), async(req, res) => {

    console.table(req.auth)
    
    if (!req.auth.sessionId) return unauthenticated(res);

    const response = await recipes.add(req.body);
    res.statusCode = response.code;
    res.json(response);

})

app.post('/api/v1/recipes/thumbnails/', clerk.ClerkExpressWithAuth({}), async(req, res) => {

    if (!req.auth.sessionId) return unauthenticated(res);
    
    const response = await recipes.addThumbnail(req.body);
    res.statusCode = response.code;
    res.json(response);

})

app.get('/api/v1/recipes/thumbnails/:idx', async(req, res) => {
    
    const response = await recipes.getThumbnail(req.params.idx);

    res.writeHead(200, {
        'Content-Type': `image/${response.format}`,
        'Content-Length': response.data.length
    });

    res.end(response.data);

})

app.delete('/api/v1/recipes/:idx', clerk.ClerkExpressWithAuth({}), async(req, res) => {

    if (!req.auth.sessionId) return unauthenticated(res);
    
    const response = await recipes.delete(req.params.idx);
    res.statusCode = response.code;
    res.json(response);

})

app.listen(port, host, async() => {
    console.log(`\x1b[33m→ Connecting to Database...\x1b[0m`)
    await db.connect();
    console.log(`\x1b[32m → Connected.\x1b[0m`)
    console.log(`\x1b[32mNinjaChefs API listening on port ${port}\x1b[0m`)
})