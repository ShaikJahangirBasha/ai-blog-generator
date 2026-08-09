import express from "express";
import cors from "cors";

import chatRoutes from "./routes/chatRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

const app = express();

/* ==========================================
   Allowed Frontend Origins
========================================== */

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  process.env.CLIENT_URL,
].filter(Boolean);

/* ==========================================
   CORS Configuration
========================================== */

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header
      // such as Postman and server-to-server requests.
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.warn(
        `⚠️ CORS blocked origin: ${origin}`
      );

      return callback(null, false);
    },

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

/* ==========================================
   Body Parsers
========================================== */

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

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

app.use(
  "/api/chat",
  chatRoutes
);

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