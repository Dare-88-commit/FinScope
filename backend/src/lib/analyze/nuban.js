// Placeholder. Replace with the official CBN checksum when you’re ready.
export function looksLikeValidNuban(raw) {
    const digits = (raw || "").replace(/\D/g, "");
    if (digits.length !== 10) return false;
    if (/^(\d)\1{9}$/.test(digits)) return false; // 1111111111, etc.
    return true;
}
