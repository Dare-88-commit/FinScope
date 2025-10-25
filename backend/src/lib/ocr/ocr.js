// src/lib/ocr/ocr.js
import Tesseract from "tesseract.js";
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// set this true if you downloaded eng.traineddata(.gz) to backend/src/data/tessdata
const USE_LOCAL_TESSDATA = false;

const CDN_LANG_PATH = "https://tessdata.projectnaptha.com/4.0.0";
const LOCAL_LANG_PATH = path.resolve(__dirname, "../../data/tessdata");

export async function ocrBuffer(buf) {
    // Preprocess the image for OCR: grayscale, normalize, and lightly sharpen
    const processed = await sharp(buf)
        .ensureAlpha()
        .removeAlpha()
        .grayscale()
        .normalise()
        .sharpen()
        .toBuffer();

    const options = {
        langPath: USE_LOCAL_TESSDATA ? LOCAL_LANG_PATH : CDN_LANG_PATH,
        gzip: true,
        tessedit_pageseg_mode: Tesseract.PSM.SINGLE_BLOCK
        // absolutely NO logger or functions here
    };

    const { data } = await Tesseract.recognize(processed, "eng", options);
    const text = (data?.text || "").replace(/\s+/g, " ").trim();
    return text;
}
