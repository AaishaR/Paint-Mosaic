import router from './router';
import express, { Express, Request, Response, Application } from 'express';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import db from './models/db';


// const corsOptions: cors.CorsOptions = {
//   origin: 'http://localhost:3000',
//   optionsSuccessStatus: 200,
// }

const whitelist = ['http://localhost:3000', 'https://paint-mosaic-jz5k.vercel.app'];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin!) !== -1 || !origin) {
      // Using ! to tell TypeScript that origin is not null or undefined
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
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
    'Accept']
};



//For env File 
dotenv.config({ path: './.env' });
db();


const app: Application = express();

const PORT = 3000;
//corsOptions)
app.use(cors(corsOptions));
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
app.use(express.json());
app.use(router);
app.listen(PORT, () => {
  console.log(`👾👾 Server running at http://localhost:${PORT} 👾👾`);
});