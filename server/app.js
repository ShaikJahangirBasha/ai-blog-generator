import express from "express";
import cors from "cors";


import chatRoutes from "./routes/chatRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";



const app = express();

/* ==========================================
   Middlewares
========================================== */

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ==========================================
   Health Check
========================================== */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AI Blog Generator API Running 🚀",
  });
});

/* ==========================================
   Routes
========================================== */

app.use("/api/chat", chatRoutes);

/* ==========================================
   404
========================================== */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

/* ==========================================
   Error Handler
========================================== */

app.use(errorMiddleware);

export default app;