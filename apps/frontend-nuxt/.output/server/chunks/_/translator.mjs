import axios from 'axios';
import translate from 'google-translate-api-x';

async function translateWithGemini(texts, apiKey) {
  var _a, _b, _c, _d, _e, _f;
  if (!apiKey || apiKey === "YOUR_GEMINI_API_KEY") {
    throw new Error("Gemini API key is invalid or not provided");
  }
  const prompt = `You are a professional light novel translator. Translate the following JSON array of English strings to natural-sounding, contextually accurate Indonesian suitable for a novel reader. Keep the original expressions and formatting. Return a JSON array of strings in the exact same order and length. Return ONLY the JSON, without markdown formatting or code blocks.

Input JSON:
${JSON.stringify(texts)}`;
  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey.trim()}`,
    {
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        responseMimeType: "application/json"
      }
    },
    {
      headers: { "Content-Type": "application/json" },
      timeout: 3e4
    }
  );
  const rawText = (_f = (_e = (_d = (_c = (_b = (_a = response.data) == null ? void 0 : _a.candidates) == null ? void 0 : _b[0]) == null ? void 0 : _c.content) == null ? void 0 : _d.parts) == null ? void 0 : _e[0]) == null ? void 0 : _f.text;
  if (!rawText) throw new Error("Empty response from Gemini API");
  const parsed = JSON.parse(rawText);
  if (Array.isArray(parsed) && parsed.length === texts.length) {
    return parsed;
  }
  throw new Error("Gemini returned array length mismatch");
}
async function translateBatchDeepL(texts, apiKey) {
  var _a;
  if (!apiKey) throw new Error("DeepL API key is required");
  const isFree = apiKey.trim().endsWith(":fx");
  const endpoint = isFree ? "https://api-free.deepl.com/v2/translate" : "https://api.deepl.com/v2/translate";
  const response = await axios.post(
    endpoint,
    {
      text: texts,
      target_lang: "ID"
    },
    {
      headers: {
        "Authorization": `DeepL-Auth-Key ${apiKey.trim()}`,
        "Content-Type": "application/json"
      },
      timeout: 3e4
    }
  );
  const translations = (_a = response.data) == null ? void 0 : _a.translations;
  if (Array.isArray(translations)) {
    return translations.map((t) => t.text);
  }
  throw new Error("Invalid response format from DeepL API");
}
async function translateBatchLibre(texts, apiUrl, apiKey) {
  const targetUrl = (apiUrl).replace(/\/$/, "");
  const promises = texts.map(
    (t) => axios.post(
      `${targetUrl}/translate`,
      {
        q: t,
        source: "auto",
        target: "id",
        format: "text",
        api_key: apiKey ? apiKey.trim() : void 0
      },
      {
        headers: { "Content-Type": "application/json" },
        timeout: 2e4
      }
    )
  );
  const responses = await Promise.all(promises);
  return responses.map((r) => {
    var _a, _b;
    return (_b = (_a = r.data) == null ? void 0 : _a.translatedText) != null ? _b : "";
  });
}
async function translateBatchGoogle(texts) {
  var _a;
  try {
    const res = await translate(texts, { to: "id" });
    const rawArr = Array.isArray(res) ? res : [res];
    return rawArr.map((item) => {
      var _a2;
      return (_a2 = item.text) != null ? _a2 : "";
    });
  } catch (e) {
    const results = [];
    for (const t of texts) {
      try {
        const res = await translate(t, { to: "id" });
        results.push((_a = res == null ? void 0 : res.text) != null ? _a : t);
      } catch {
        results.push(t);
      }
    }
    return results;
  }
}
async function translateBatch(texts, config = {}) {
  if (!texts || texts.length === 0) return [];
  const engine = config.engine || "google";
  if (engine === "libre" || config.libreUrl) {
    try {
      return await translateBatchLibre(texts, config.libreUrl || "http://localhost:5000", config.libreApiKey);
    } catch (e) {
      console.warn("LibreTranslate failed, falling back to Google Translate:", e == null ? void 0 : e.message);
    }
  }
  if (engine === "gemini" && config.geminiApiKey) {
    try {
      return await translateWithGemini(texts, config.geminiApiKey);
    } catch (e) {
      console.warn("Gemini API failed, falling back to Google Translate:", e == null ? void 0 : e.message);
    }
  }
  if (engine === "deepl" && config.deeplApiKey) {
    try {
      return await translateBatchDeepL(texts, config.deeplApiKey);
    } catch (e) {
      console.warn("DeepL API failed, falling back to Google Translate:", e == null ? void 0 : e.message);
    }
  }
  return await translateBatchGoogle(texts);
}

export { translateBatch as t };
//# sourceMappingURL=translator.mjs.map
