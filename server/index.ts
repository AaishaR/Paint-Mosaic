import router from './router';
import express, { Express, Request, Response , Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './models/db';


const corsOptions: cors.CorsOptions = {
  origin: 'http://localhost:3001',
  optionsSuccessStatus: 200,
}

//For env File 
dotenv.config({ path: './.env' });
db();


const app: Application = express();

const PORT = 3000;

app.use(cors(corsOptions));
app.use(express.json());
app.use(router);
app.listen(PORT, () => {
  console.log(`👾👾 Server running at http://localhost:${PORT} 👾👾`);
});