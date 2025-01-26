import mongoose from "mongoose";

// יצירת פונקציה לחיבור לבסיס נתונים
export async function connectDB() {
  const mongoURI =
    process.env.MONGOURI || "mongodb://localhost:27017/mydatabase"; // החלף בכתובת המתאימה
  try {
    // התחברות ל-MongoDB
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully");
    
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // סיום התוכנית במקרה של שגיאה
  }
}
