
// const express = require('express');
// const app = express();
import router from './router';
// const cors = require('cors')

import express, { Express, Request, Response , Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './models/db';

//For env File 
dotenv.config({ path: './.env' });
db();
const app: Application = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(router);
app.listen(PORT, () => {
  console.log(`👾👾 Server running at http://localhost:${PORT} 👾👾`);
});