import { translateBatch } from '../../utils/novel/translator'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { texts, engine, geminiApiKey, deeplApiKey, libreUrl, libreApiKey } = body || {}

  if (!texts || !Array.isArray(texts)) {
    throw createError({ statusCode: 400, statusMessage: 'texts array is required' })
  }

  const translated = await translateBatch(texts, {
    engine,
    geminiApiKey,
    deeplApiKey,
    libreUrl,
    libreApiKey
  })

  return {
    success: true,
    data: translated
  }
})
