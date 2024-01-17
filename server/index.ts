import router from './router';
import express, { Express, Request, Response, Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './models/db';


const corsOptions: cors.CorsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
}

//For env File 
dotenv.config({ path: './.env' });
db();


const app: Application = express();

const PORT = 3000;
//corsOptions)
// app.use(cors(corsOptions));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.json());
app.use(router);
app.listen(PORT, () => {
  console.log(`👾👾 Server running at http://localhost:${PORT} 👾👾`);
});