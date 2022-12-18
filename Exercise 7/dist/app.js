"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vehicleRouter_1 = __importDefault(require("./routers/vehicleRouter"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/vehicle', vehicleRouter_1.default);
app.use(express_1.default.static('public'));
exports.default = app;
