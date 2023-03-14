"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_routes_1 = __importDefault(require("./routes/index.routes"));
dotenv_1.default.config();
const port = process.env.PORT;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(index_routes_1.default);
app.get('/', (req, res) => {
    res.json('Hello world');
});
app.listen(port, () => {
    console.log(`⚡Server running on port ${port}`);
});
