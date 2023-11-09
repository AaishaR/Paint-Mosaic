'use strict';

const express = require('express');
const app = express();
const router = require('./router.js');
const cors = require('cors')

const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(router);
app.listen(PORT, () => {
  console.log(`👾👾 Server running at http://localhost:${PORT} 👾👾`);
});