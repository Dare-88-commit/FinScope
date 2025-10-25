const URL_REGEX = /((https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[^\s]*)?)/gi;
const PHONE_REGEX_NG = /\b(?:\+?234|0)(7\d|8\d|9\d)\d{8}\b/g;
const NUBAN_REGEX = /\b\d{10}\b/g;

export function extractEntities(text) {
    const urls = [...new Set((text.match(URL_REGEX) || []).map(cleanUrl))];
    const phones = [...new Set(text.match(PHONE_REGEX_NG) || [])];
    const bankAccounts = [...new Set(text.match(NUBAN_REGEX) || [])].map(raw => ({ raw }));
    return { urls, phones, bankAccounts };
}

function cleanUrl(u) {
    return u.replace(/[),.;!?]+$/, "");
}
