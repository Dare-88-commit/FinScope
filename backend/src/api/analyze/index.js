import express from "express";
import multer from "multer";
import { analyzePlainText } from "../../lib/analyze/analyze.js";
import { ocrBuffer } from "../../lib/ocr/ocr.js";
import { explainWithBedrock } from "../../lib/llm/bedrock.js";
import { logger } from "../../utils/logger.js";

const router = express.Router();

// Memory storage, simple size cap, basic mime guard
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 6 * 1024 * 1024 }, // 6 MB
    fileFilter: (_req, file, cb) => {
        const ok = ["image/png", "image/jpeg", "image/webp"].includes(file.mimetype);
        cb(ok ? null : new Error("Unsupported file type"), ok);
    }
});

router.post("/", upload.single("file"), async (req, res) => {
    try {
        let text = "";
        if (req.file) {
            try {
                text = await ocrBuffer(req.file.buffer);
            } catch (e) {
                console.error("[OCR ERROR]", e?.message || e);
                return res.status(400).json({ error: "OCR failed. Use PNG/JPG/WebP under 6MB." });
            }
        } else if (typeof req.body?.text === "string") {
            text = req.body.text;
        } else {
            return res.status(400).json({ error: "Provide JSON {text} or multipart file=image" });
        }

        const analysis = analyzePlainText(text);
        const explanation = await explainWithBedrock({
            text: analysis.text, score: analysis.score, reasons: analysis.reasons
        });

        return res.json({ ...analysis, explanation: explanation || null });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to analyze message" });
    }
});


export default router;
