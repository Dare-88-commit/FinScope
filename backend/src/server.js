import express from "express";
import cors from "cors";
import analyzeRouter from "./api/analyze/index.js";
import { logger } from "./utils/logger.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin: ["https://fin-scope-kappa.vercel.app", "http://localhost:3000"],
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
    })
);

app.use(express.json({ limit: "50kb" })); // text payloads only; images go via multipart
app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/api/analyze", analyzeRouter);

// 404
app.use((_req, res) => res.status(404).json({ error: "Not found" }));

app.listen(PORT, () => logger.info(`Backend running on port ${PORT}`));
