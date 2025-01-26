"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = connectDB;
const mongoose_1 = __importDefault(require("mongoose"));
// יצירת פונקציה לחיבור לבסיס נתונים
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        const mongoURI = process.env.MONGOURI || "mongodb://localhost:27017/mydatabase"; // החלף בכתובת המתאימה
        try {
            // התחברות ל-MongoDB
            yield mongoose_1.default.connect(mongoURI);
            console.log("MongoDB connected successfully");
        }
        catch (err) {
            console.error("Error connecting to MongoDB:", err);
            process.exit(1); // סיום התוכנית במקרה של שגיאה
        }
    });
}
