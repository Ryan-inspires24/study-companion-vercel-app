import express from "express";
import serverless from "serverless-http";
import authRoutes from "./routes/index.js"; // Adjust if needed

const app = express();

app.use(express.json());
app.use("/api", authRoutes);

// ✅ Health Check Route
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

export default serverless(app);
