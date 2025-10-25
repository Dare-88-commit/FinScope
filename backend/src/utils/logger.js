const levels = ["debug", "info", "warn", "error"];
function log(level, msg) {
    const ts = new Date().toISOString();
    // Do not log raw user text in production; keep it clean.
    // Add a real logger later if you start liking logs too much.
    console[level === "error" ? "error" : level === "warn" ? "warn" : "log"](`[${ts}] ${level.toUpperCase()}: ${msg}`);
}
export const logger = {
    debug: (m) => log("debug", m),
    info: (m) => log("info", m),
    warn: (m) => log("warn", m),
    error: (m) => log("error", m)
};
