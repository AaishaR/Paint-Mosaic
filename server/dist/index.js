"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("./router"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./models/db"));
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
};
//For env File 
dotenv_1.default.config({ path: './.env' });
(0, db_1.default)();
const app = (0, express_1.default)();
const PORT = 3000;
//corsOptions)
// app.use(cors(corsOptions));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express_1.default.json());
app.use(router_1.default);
app.listen(PORT, () => {
    console.log(`👾👾 Server running at http://localhost:${PORT} 👾👾`);
});
