// eslint-disable-next-line @typescript-eslint/no-var-requires
const subdomain = require('express-subdomain'); // Because there aren't types for this library

import express from 'express';
import path from 'path';
import minimist from 'minimist'
import http from 'http'
import expressSharp from 'express-sharp';

require('dotenv').config({ path: path.join(__dirname, '../.env.local') });
const launchArgs = minimist(process.argv.slice(2), {
    string: ['port'],
    boolean: ['dev'],

    default: {
        dev: true,
        port: 8080,
    },
});

const app = express()
const server = http.createServer(app)

app.use(
    '/avatars',
    expressSharp.expressSharp({
        imageAdapter: new expressSharp.FsAdapter(path.join(__dirname, '../../data/avatars')),
    })
);

app.get("/ping", (req: express.Request, res: express.Response) => {
    res.send("pong")
})

app.use(subdomain('cdn', app));

