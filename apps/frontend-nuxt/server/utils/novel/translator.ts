import axios from 'axios'
import translate from 'google-translate-api-x'

export type TranslationEngine = 'google' | 'gemini' | 'deepl' | 'libre'

export interface TranslationConfig {
  engine?: TranslationEngine
  geminiApiKey?: string
  deeplApiKey?: string
  libreUrl?: string
  libreApiKey?: string
}

export async function translateWithGemini(texts: string[], apiKey: string): Promise<string[]> {
  if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY') {
    throw new Error('Gemini API key is invalid or not provided')
  }

  const prompt = `You are a professional light novel translator. Translate the following JSON array of English strings to natural-sounding, contextually accurate Indonesian suitable for a novel reader. Keep the original expressions and formatting. Return a JSON array of strings in the exact same order and length. Return ONLY the JSON, without markdown formatting or code blocks.\n\nInput JSON:\n${JSON.stringify(texts)}`

  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey.trim()}`,
    {
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        responseMimeType: 'application/json'
      }
    },
    {
      headers: { 'Content-Type': 'application/json' },
      timeout: 30000
    }
  )

  const rawText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text
  if (!rawText) throw new Error('Empty response from Gemini API')

  const parsed = JSON.parse(rawText)
  if (Array.isArray(parsed) && parsed.length === texts.length) {
    return parsed
  }
  throw new Error('Gemini returned array length mismatch')
}

export async function translateBatchDeepL(texts: string[], apiKey: string): Promise<string[]> {
  if (!apiKey) throw new Error('DeepL API key is required')

  const isFree = apiKey.trim().endsWith(':fx')
  const endpoint = isFree ? 'https://api-free.deepl.com/v2/translate' : 'https://api.deepl.com/v2/translate'

  const response = await axios.post(
    endpoint,
    {
      text: texts,
      target_lang: 'ID'
    },
    {
      headers: {
        'Authorization': `DeepL-Auth-Key ${apiKey.trim()}`,
        'Content-Type': 'application/json'
      },
      timeout: 30000
    }
  )

  const translations = response.data?.translations
  if (Array.isArray(translations)) {
    return translations.map((t: any) => t.text)
  }
  throw new Error('Invalid response format from DeepL API')
}

export async function translateBatchLibre(texts: string[], apiUrl: string, apiKey?: string): Promise<string[]> {
  const targetUrl = (apiUrl || 'http://localhost:5000').replace(/\/$/, '')

  const promises = texts.map(t =>
    axios.post(
      `${targetUrl}/translate`,
      {
        q: t,
        source: 'auto',
        target: 'id',
        format: 'text',
        api_key: apiKey ? apiKey.trim() : undefined
      },
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 20000
      }
    )
  )

  const responses = await Promise.all(promises)
  return responses.map(r => r.data?.translatedText ?? '')
}

export async function translateBatchGoogle(texts: string[]): Promise<string[]> {
  try {
    const res = await translate(texts, { to: 'id' })
    const rawArr = Array.isArray(res) ? res : [res]
    return rawArr.map((item: any) => item.text ?? '')
  } catch (e: any) {
    // Single fallback loop if batch fails
    const results: string[] = []
    for (const t of texts) {
      try {
        const res = await translate(t, { to: 'id' })
        results.push((res as any)?.text ?? t)
      } catch {
        results.push(t)
      }
    }
    return results
  }
}

export async function translateBatch(texts: string[], config: TranslationConfig = {}): Promise<string[]> {
  if (!texts || texts.length === 0) return []

  const engine = config.engine || 'google'

  // 1. Try LibreTranslate
  if (engine === 'libre' || config.libreUrl) {
    try {
      return await translateBatchLibre(texts, config.libreUrl || 'http://localhost:5000', config.libreApiKey)
    } catch (e: any) {
      console.warn('LibreTranslate failed, falling back to Google Translate:', e?.message)
    }
  }

  // 2. Try Gemini API
  if (engine === 'gemini' && config.geminiApiKey) {
    try {
      return await translateWithGemini(texts, config.geminiApiKey)
    } catch (e: any) {
      console.warn('Gemini API failed, falling back to Google Translate:', e?.message)
    }
  }

  // 3. Try DeepL API
  if (engine === 'deepl' && config.deeplApiKey) {
    try {
      return await translateBatchDeepL(texts, config.deeplApiKey)
    } catch (e: any) {
      console.warn('DeepL API failed, falling back to Google Translate:', e?.message)
    }
  }

  // 4. Default / Fallback: Google Translate
  return await translateBatchGoogle(texts)
}
