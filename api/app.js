
const express = require('express');
const app = express();

const port = process.env.PORT || 8080;
const host = process.env.HOST || '127.0.0.1';

const ds = require("./services/recipes");
const db = require('./db/db.config');

app.use(express.json({limit: '50mb'}));


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'accept, authorization, content-type, x-requested-with');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.setHeader('Access-Control-Allow-Origin', '*');

    next();
});

app.get('/api/v1/recipes', async(req, res) => {

    const retrivedData = await ds.get();
    res.statusCode = retrivedData.code;

    res.json(retrivedData.data);

})

app.post('/api/v1/recipes', async(req, res) => {
    
    const response = await ds.add(req.body);
    res.statusCode = response.code;
    res.json(response);

})

app.post('/api/v1/recipes/thumbnails/', async(req, res) => {
    
    const response = await ds.addThumbnail(req.body);
    res.statusCode = response.code;
    res.json(response);

})

app.get('/api/v1/recipes/thumbnails/:idx', async(req, res) => {
    
    const response = await ds.getThumbnail(req.params.idx);

    res.writeHead(200, {
        'Content-Type': `image/${response.format}`,
        'Content-Length': response.data.length
    });

    res.end(response.data);

})

app.delete('/api/v1/recipes/:idx', async(req, res) => {
    
    const response = await ds.delete(req.params.idx);
    res.statusCode = response.code;
    res.json(response);

})

app.listen(port, host, async() => {
    console.log(`\x1b[33m→ Connecting to Database...\x1b[0m`)
    await db.connect();
    console.log(`\x1b[32m → Connected.\x1b[0m`)
    console.log(`\x1b[32mNinjaChefs API listening on port ${port}\x1b[0m`)
})