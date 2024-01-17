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
// const corsOptions: cors.CorsOptions = {
//   origin: 'http://localhost:3000',
//   optionsSuccessStatus: 200,
// }
// const whitelist = ['http://localhost:3000', 'https://paint-mosaic-jz5k.vercel.app/', 'https://paint-mosaic-jz5k.vercel.app'];
// const corsOptions: CorsOptions = {
//   origin: (origin, callback) => {
//     if (whitelist.indexOf(origin!) !== -1 || !origin) {
//       // Using ! to tell TypeScript that origin is not null or undefined
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
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
//     'Accept']
// };
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
dotenv_1.default.config({ path: './.env' });
(0, db_1.default)();
const app = (0, express_1.default)();
const PORT = 3000;
//corsOptions)
app.use((0, cors_1.default)(corsOptions));
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
app.use(express_1.default.json());
app.use(router_1.default);
app.listen(PORT, () => {
    console.log(`👾👾 Server running at http://localhost:${PORT} 👾👾`);
});
