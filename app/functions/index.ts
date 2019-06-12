import bodyParser from 'body-parser';
import chalk from 'chalk';
import cors from 'cors';
import express from 'express';
import functions from 'firebase-functions';
import { dialogflowApp } from '../intents';

const app = express();
// use of bodyparser to parse text to object
app.use(bodyParser.json());

app.use(cors());

// EXPRESS APP fulfillment route (POST). The entire dialogFlowApp object (incl its handlers) is the callback handler for this route.
app.post('/', dialogflowApp);

//  EXPRESS APP test route (GET)
app.get('/', (req, res) => {
    res.send('CONFIRMED RECEIPT OF GET.');
});

// start server
app.listen(3111, () => {
    console.log(chalk.bgRed('server is started on localhost:3111'));
});
