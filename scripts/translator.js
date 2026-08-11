const axios = require('axios');
const translate = require('google-translate-api-x');

async function translateWithGemini(texts, apiKey) {
    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
            {
                contents: [
                    {
                        role: "user",
                        parts: [
                            {
                                text: `You are a professional light novel translator. Translate the following JSON array of English strings to natural-sounding, contextually accurate Indonesian suitable for a novel reader. Keep the original expressions and formatting. Return a JSON array of strings in the exact same order and length. Return ONLY the JSON, without markdown formatting or code blocks.\n\nInput JSON:\n${JSON.stringify(texts)}`
                            }
                        ]
                    }
                ],
                generationConfig: {
                    responseMimeType: "application/json"
                }
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );

        const text = response.data.candidates[0].content.parts[0].text;
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed) && parsed.length === texts.length) {
            return parsed;
        }
        throw new Error("Length mismatch or invalid format");
    } catch (error) {
        throw error;
    }
}

async function translateBatchLibre(texts, apiUrl, apiKey) {
    try {
        const promises = texts.map(t => axios.post(`${apiUrl.replace(/\/$/, '')}/translate`, {
            q: t,
            source: 'auto',
            target: 'id',
            format: 'text',
            api_key: apiKey ? apiKey.trim() : undefined
        }, { headers: { 'Content-Type': 'application/json' } }));

        const responses = await Promise.all(promises);
        return responses.map(r => r.data.translatedText);
    } catch (error) { throw error; }
}

async function translateBatch(texts, config) {
    if (!texts || texts.length === 0) return [];
    
    // We try LibreTranslate first if configured
    if (config.LIBRE_TRANSLATE_URL) {
        try {
            const results = await translateBatchLibre(texts, config.LIBRE_TRANSLATE_URL, config.LIBRE_TRANSLATE_KEY);
            return results;
        } catch(e) {
            console.error("LibreTranslate Error, falling back...", e.message);
        }
    }
    
    // Fallback to Gemini
    if (config.GEMINI_API_KEY && config.GEMINI_API_KEY !== 'YOUR_GEMINI_API_KEY') {
        try {
            const results = await translateWithGemini(texts, config.GEMINI_API_KEY);
            return results;
        } catch(e) {
            console.error("Gemini Error, falling back...", e.message);
        }
    }

    // Ultimate fallback: google-translate-api-x
    try {
        const res = await translate(texts, { to: 'id' });
        const rawArr = Array.isArray(res) ? res : [res];
        return rawArr.map(item => item.text);
    } catch(e) {
        console.error("Google Translate Error...", e.message);
        // If all fails, return original
        return texts;
    }
}

module.exports = {
    translateBatch,
    translateWithGemini,
    translateBatchLibre
};