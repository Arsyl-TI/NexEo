import { c as defineEventHandler, g as getRouterParam, e as createError, j as setResponseHeader } from '../../../../_/nitro.mjs';
import fs from 'fs';
import path from 'path';
import { s as serverConfig } from '../../../../_/config.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const export_get = defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  if (!slug || typeof slug !== "string") {
    throw createError({ statusCode: 400, statusMessage: "slug novel wajib diisi" });
  }
  const novelDir = path.join(serverConfig.novel.dir, slug);
  if (!fs.existsSync(novelDir)) {
    throw createError({ statusCode: 404, statusMessage: "Folder novel tidak ditemukan" });
  }
  let meta = { title: slug, author: "", description: "" };
  const metaPath = path.join(novelDir, "meta.json");
  if (fs.existsSync(metaPath)) {
    try {
      meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
    } catch {
    }
  }
  const files = fs.readdirSync(novelDir);
  const txtFiles = files.filter((f) => f.toLowerCase().endsWith(".txt")).sort((a, b) => {
    const numA = parseInt(a.replace(/\D/g, "") || "0", 10);
    const numB = parseInt(b.replace(/\D/g, "") || "0", 10);
    return numA - numB;
  });
  if (txtFiles.length === 0) {
    throw createError({ statusCode: 400, statusMessage: "Tidak ada berkas chapter dalam novel ini" });
  }
  let fullContent = `==================================================
`;
  fullContent += `JUDUL: ${meta.title || slug}
`;
  if (meta.author) fullContent += `AUTHOR: ${meta.author}
`;
  if (meta.description) fullContent += `SINOPSIS: ${meta.description.replace(/<[^>]*>?/gm, "")}
`;
  fullContent += `TOTAL CHAPTER: ${txtFiles.length}
`;
  fullContent += `DIEKSPOR DARI: NexEo Local App
`;
  fullContent += `==================================================


`;
  txtFiles.forEach((fileName, index) => {
    const filePath = path.join(novelDir, fileName);
    const chapterText = fs.readFileSync(filePath, "utf-8");
    fullContent += `--------------------------------------------------
`;
    fullContent += `CHAPTER ${index + 1}: ${fileName.replace(/\.txt$/i, "")}
`;
    fullContent += `--------------------------------------------------

`;
    fullContent += chapterText + `


`;
  });
  setResponseHeader(event, "Content-Type", "text/plain; charset=utf-8");
  setResponseHeader(event, "Content-Disposition", `attachment; filename="${encodeURIComponent(slug)}-full.txt"`);
  return fullContent;
});

export { export_get as default };
//# sourceMappingURL=export.get.mjs.map
