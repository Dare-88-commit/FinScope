import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import { logger } from "../../utils/logger.js";

const useBedrock = process.env.USE_BEDROCK === "true";
const modelId = process.env.BEDROCK_MODEL_ID || "anthropic.claude-3-haiku-20240307-v1:0";
let client = null;

function getClient() {
    if (!useBedrock) return null;
    if (!client) client = new BedrockRuntimeClient({ region: process.env.AWS_REGION || "us-east-1" });
    return client;
}

export async function explainWithBedrock({ text, score, reasons }) {
    if (!useBedrock) return null;
    try {
        const c = getClient();
        if (!c) return null;

        const prompt = [
            "You assess suspicious messages for Nigerian users.",
            "Using the reasons and score, write a concise explanation (<=120 words) and 3 practical safety tips.",
            `Text:\n${text}`,
            `Reasons: ${reasons.join(", ") || "none"}`,
            `Score: ${score}/100`
        ].join("\n\n");

        const body = {
            anthropic_version: "bedrock-2023-05-31",
            messages: [{ role: "user", content: [{ type: "text", text: prompt }] }],
            temperature: 0.2,
            max_tokens: 220
        };

        const res = await c.send(new InvokeModelCommand({
            modelId,
            contentType: "application/json",
            accept: "application/json",
            body: JSON.stringify(body)
        }));

        const json = JSON.parse(new TextDecoder().decode(res.body));
        const textOut = json?.content?.[0]?.text || "";
        return textOut.trim() || null;
    } catch (e) {
        logger.warn(`Bedrock explain failed: ${e?.message || e}`);
        return null;
    }
}
