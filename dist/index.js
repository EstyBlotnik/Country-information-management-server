"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 3000;
// התחלת השרת
app_1.default.listen(PORT, () => {
    console.log(`⚡️ השרת פועל בכתובת http://localhost:${PORT}`);
});
