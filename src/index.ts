import app from "./app";

const PORT = process.env.PORT || 3000;

// התחלת השרת
app.listen(PORT, () => {
  console.log(`⚡️ השרת פועל בכתובת http://localhost:${PORT}`);
});
