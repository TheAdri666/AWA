"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const PORT = 3000;
const mongoDB = process.env.MONGO_URL || 'mongodb://localhost:27017/testdb';
mongoose_1.default.connect(mongoDB, (err) => {
    if (err) {
        console.log('Error connecting to the database', err);
    }
    else {
        app_1.default.listen(PORT, () => {
            console.log(`App listening on port ${PORT}.`);
        });
    }
});
