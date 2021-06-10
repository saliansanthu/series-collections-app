import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import connectDB from './config/dbConfig.js';

import userRoutes from './routes/userRoutes.js';
import seriesCollectionsRoutes from './routes/seriesCollectionsRoutes.js';

//dotenv config
dotenv.config();

//App config
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

//DB config
connectDB();

//Routes
app.get('/', (req, res) => res.status(200).send("Hi!!!"));
app.use('/user', userRoutes);
app.use('/series-collections', seriesCollectionsRoutes);

//Listener
const port = process.env.PORT || 9000;

app.listen(port, () => console.log(`App started and listening on localhost:${port}`));