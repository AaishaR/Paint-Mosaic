import router from './router';
import express, { Express, Request, Response, Application } from 'express';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import db from './models/db';

const corsOptions = {
  origin: 'https://paint-mosaic-jz5k.vercel.app', 
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  optionsSuccessStatus: 200,
  credentials: true,
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'device-remember-token',
    'Access-Control-Allow-Origin',
    'Origin',
    'Accept',
  ],
};


//For env File 
dotenv.config({ path: './.env' });
db();


const app: Application = express();

const PORT = 3000;
//corsOptions)
app.use(cors(corsOptions));
app.use(express.json());
app.use(router);
app.listen(PORT, () => {
  console.log(`👾👾 Server running at http://localhost:${PORT} 👾👾`);
});