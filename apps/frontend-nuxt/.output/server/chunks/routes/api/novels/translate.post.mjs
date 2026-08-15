import { c as defineEventHandler, r as readBody, e as createError } from '../../../_/nitro.mjs';
import { t as translateBatch } from '../../../_/translator.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'axios';
import 'google-translate-api-x';

const translate_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { texts, engine, geminiApiKey, deeplApiKey, libreUrl, libreApiKey } = body || {};
  if (!texts || !Array.isArray(texts)) {
    throw createError({ statusCode: 400, statusMessage: "texts array is required" });
  }
  const translated = await translateBatch(texts, {
    engine,
    geminiApiKey,
    deeplApiKey,
    libreUrl,
    libreApiKey
  });
  return {
    success: true,
    data: translated
  };
});

export { translate_post as default };
//# sourceMappingURL=translate.post.mjs.map
