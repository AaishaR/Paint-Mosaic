"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("./router"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./models/db"));
// const corsOptions = {
//   // origin: 'https://paint-mosaic-jz5k.vercel.app', 
//   origin: 'http://localhost:3001', 
//   methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
//   optionsSuccessStatus: 200,
//   credentials: true,
//   allowedHeaders: [
//     'Content-Type',
//     'Authorization',
//     'X-Requested-With',
//     'device-remember-token',
//     'Access-Control-Allow-Origin',
//     'Origin',
//     'Accept',
//   ],
// };
//For env File 
dotenv_1.default.config({ path: './.env' });
(0, db_1.default)();
const app = (0, express_1.default)();
const PORT = 3000;
//corsOptions)
// app.use(cors(corsOptions));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(router_1.default);
app.listen(PORT, () => {
    console.log(`👾👾 Server running at http://localhost:${PORT} 👾👾`);
});
