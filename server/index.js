"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mockdb_1 = require("@mattellis91/mockdb");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use('/api/articles', require('./routes/articles'));
app.use('/api/users', require('./routes/users'));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
    const dbConnection = mockdb_1.MockDb.connect('demo-db');
    app.locals.dbConnection = dbConnection;
});
