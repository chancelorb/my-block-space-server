const express = require('express')
const { setup } = require('radiks-server')
const keys = require('./config/keys');
const expressWS = require('express-ws');
const { COLLECTION } = require('radiks-server/app/lib/constants');
const logger = require('morgan')
const fs = require('fs');
const https = require('https');


/**
 * Registered via single app
 * node index.js
*/
const app = express()
expressWS(app)

app.use(logger('dev'));
app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

setup({
    mongoDBUrl: keys.mongoURI
}).then((RadiksController) => {
    const db = RadiksController.DB
    const radiksData = db.collection(COLLECTION);
    app.use('/radiks', RadiksController);
    app.get('/', (req, res) => {
        res.send('HELLO WORLD')
    })

    app.get('/users/random', async (req, res) => {
        const users = await radiksData.aggregate([
            { $match: { radiksType: 'VriendUser' } },
            { $sample: { size: 3 } }
        ]).toArray()
        res.send({ users })
        console.log(users)
    })
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})