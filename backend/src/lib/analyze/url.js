export function analyzeUrlSafety(url) {
    try {
        const u = new URL(normalizeUrl(url));
        const host = u.hostname;
        const hasIp = /^\d{1,3}(\.\d{1,3}){3}$/.test(host);
        const isPuny = host.startsWith("xn--");
        const longQs = (u.search || "").length > 80;
        const weirdTld = /\.(ru|tk|cn|top|xyz|icu|gq|work|zip)$/i.test(host);
        const manySub = host.split(".").length > 4;
        return { hasIp, isPuny, longQs, weirdTld, manySub };
    } catch {
        return { invalid: true };
    }
}
export function normalizeUrl(u) {
    return /^https?:\/\//i.test(u) ? u : "https://" + u;
}
