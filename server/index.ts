import router from './router';
import express, { Express, Request, Response , Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './models/db';


const corsOptions: cors.CorsOptions = {
  origin: 'https://paint-mosaic-k37c.vercel.app/',
  optionsSuccessStatus: 200,
}

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