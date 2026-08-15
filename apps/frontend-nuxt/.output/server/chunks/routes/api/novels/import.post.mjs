import { c as defineEventHandler, r as readBody, e as createError } from '../../../_/nitro.mjs';
import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import { s as serverConfig } from '../../../_/config.mjs';
import { t as translateBatch } from '../../../_/translator.mjs';
import { s as scrapeNoveldexNovelDetail, a as scrapeDreamyNovelDetail } from '../../../_/catalogScraper.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'google-translate-api-x';

async function downloadImage(url, filepath) {
  try {
    const dir = path.dirname(filepath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
      headers: { "User-Agent": "Mozilla/5.0" },
      timeout: 15e3
    });
    return new Promise((resolve) => {
      response.data.pipe(fs.createWriteStream(filepath)).on("finish", () => resolve(true)).on("error", () => resolve(false));
    });
  } catch {
    return false;
  }
}
async function importNovelFromSource(options) {
  const { sourceId, slug, translationConfig } = options;
  try {
    const detail = sourceId === "noveldex" ? await scrapeNoveldexNovelDetail(slug) : await scrapeDreamyNovelDetail(slug);
    if (!detail) {
      return { success: false, slug, downloadedCount: 0, error: "Novel detail not found" };
    }
    const novelDir = path.join(serverConfig.novel.dir, slug);
    const imagesDir = path.join(novelDir, "images");
    const indexPath = path.join(novelDir, "master_index.json");
    const metadataPath = path.join(novelDir, "metadata.json");
    if (!fs.existsSync(novelDir)) fs.mkdirSync(novelDir, { recursive: true });
    if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });
    let localCoverUrl = void 0;
    if (detail.cover) {
      const coverPathInImages = path.join(imagesDir, "cover.jpg");
      const rootCoverPath = path.join(novelDir, "cover.jpg");
      const downloaded = await downloadImage(detail.cover, coverPathInImages);
      if (downloaded && fs.existsSync(coverPathInImages)) {
        try {
          fs.copyFileSync(coverPathInImages, rootCoverPath);
        } catch {
        }
        localCoverUrl = `/_novels/${slug}/cover.jpg`;
      } else {
        localCoverUrl = detail.cover;
      }
    }
    fs.writeFileSync(metadataPath, JSON.stringify({
      id: slug,
      slug,
      title: detail.title,
      author: detail.author,
      description: detail.description,
      tags: detail.tags,
      coverUrl: localCoverUrl || detail.cover,
      sourceUrl: detail.sourceUrl
    }, null, 2));
    let masterIndex = [];
    if (fs.existsSync(indexPath)) {
      try {
        masterIndex = JSON.parse(fs.readFileSync(indexPath, "utf-8"));
      } catch {
      }
    }
    let chaptersToDownload = detail.chapters;
    if (options.chapterFilter && options.chapterFilter !== "all") {
      chaptersToDownload = detail.chapters.filter((ch) => ch.file === options.chapterFilter || ch.url === options.chapterFilter);
    }
    let downloadedCount = 0;
    for (let i = 0; i < chaptersToDownload.length; i++) {
      const ch = chaptersToDownload[i];
      if (!ch) continue;
      try {
        const res = await axios.get(ch.url, {
          headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
          timeout: 2e4
        });
        const $ = cheerio.load(res.data);
        const contentDiv = $("article.chapter-content, div.chapter-content, main, .chapter-body");
        const rawElements = [];
        const imageDownloads = [];
        const elements = contentDiv.find("p, img").toArray();
        for (let j = 0; j < elements.length; j++) {
          const el = elements[j];
          const tagName = el.tagName ? el.tagName.toLowerCase() : "";
          if (tagName === "p") {
            const text = $(el).text().trim();
            if (text) rawElements.push({ type: "text", value: text });
          } else if (tagName === "img") {
            const imgUrl = $(el).attr("src");
            if (imgUrl) {
              const filename = `chapter-${i + 1}-img-${imageDownloads.length + 1}.jpg`;
              const filepath = path.join(imagesDir, filename);
              const localPath = `images/${filename}`;
              rawElements.push({ type: "image", value: localPath });
              imageDownloads.push({ url: imgUrl, filepath });
            }
          }
        }
        const textElements = rawElements.filter((e) => e.type === "text");
        if (textElements.length > 0 && translationConfig) {
          const textsToTranslate = textElements.map((e) => e.value);
          const translatedTexts = await translateBatch(textsToTranslate, translationConfig);
          for (let k = 0; k < textElements.length; k++) {
            const item = textElements[k];
            if (item) {
              item.translatedValue = translatedTexts[k] || item.value;
            }
          }
        }
        for (const imgItem of imageDownloads) {
          await downloadImage(imgItem.url, imgItem.filepath);
        }
        const finalContent = rawElements.map((el) => {
          if (el.type === "text") {
            return { type: "text", value: el.translatedValue || el.value };
          }
          return { type: "image", value: el.value };
        });
        const chapterNumber = i + 1;
        const chapterFileName = ch.file || `chapter-${chapterNumber}.json`;
        const chapterData = {
          id: chapterNumber,
          title: ch.title,
          sourceUrl: ch.url,
          content: finalContent
        };
        fs.writeFileSync(path.join(novelDir, chapterFileName), JSON.stringify(chapterData, null, 2));
        downloadedCount++;
        const existingIdx = masterIndex.findIndex((item) => item.file === chapterFileName || item.id === chapterNumber);
        if (existingIdx !== -1) {
          masterIndex[existingIdx] = { id: chapterNumber, title: ch.title, file: chapterFileName };
        } else {
          masterIndex.push({ id: chapterNumber, title: ch.title, file: chapterFileName });
        }
        fs.writeFileSync(indexPath, JSON.stringify(masterIndex, null, 2));
      } catch (err) {
        console.error(`Failed to import chapter ${ch.title}:`, err == null ? void 0 : err.message);
      }
    }
    if (!fs.existsSync(indexPath)) {
      fs.writeFileSync(indexPath, JSON.stringify(masterIndex, null, 2));
    }
    return {
      success: true,
      slug,
      downloadedCount
    };
  } catch (err) {
    return {
      success: false,
      slug,
      downloadedCount: 0,
      error: (err == null ? void 0 : err.message) || "Scraper import error"
    };
  }
}

const import_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { sourceId, slug, chapterFilter, translationConfig } = body || {};
  if (!sourceId || !slug) {
    throw createError({ statusCode: 400, statusMessage: "sourceId and slug are required" });
  }
  const result = await importNovelFromSource({
    sourceId,
    slug,
    chapterFilter,
    translationConfig
  });
  return result;
});

export { import_post as default };
//# sourceMappingURL=import.post.mjs.map
