import fs from 'fs';
import path from 'path';
import { s as serverConfig } from './config.mjs';

function getMangaDir() {
  const dir = serverConfig.manga.dir;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return dir;
}
function listLocalManga() {
  const mangaDir = getMangaDir();
  if (!fs.existsSync(mangaDir)) return [];
  const entries = fs.readdirSync(mangaDir, { withFileTypes: true });
  const result = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const slug = entry.name;
    const item = getLocalMangaDetail(slug);
    if (item) {
      result.push(item);
    }
  }
  return result.sort((a, b) => a.title.localeCompare(b.title));
}
function getLocalMangaDetail(slug) {
  const mangaDir = getMangaDir();
  const targetDir = path.join(mangaDir, slug);
  if (!fs.existsSync(targetDir)) return null;
  let title = slug.replace(/_/g, " ").replace(/-/g, " ");
  let author;
  let description;
  let cover;
  let tags = [];
  const metaPath = path.join(targetDir, "meta.json");
  if (fs.existsSync(metaPath)) {
    try {
      const meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
      title = meta.title || title;
      author = meta.author;
      description = meta.description;
      tags = meta.tags || [];
      if (meta.cover) cover = meta.cover;
    } catch {
    }
  }
  if (!cover) {
    const rootFiles = fs.readdirSync(targetDir);
    const coverFile = rootFiles.find((f) => {
      const l = f.toLowerCase();
      return (l.includes("cover") || l.endsWith(".jpg") || l.endsWith(".png") || l.endsWith(".webp")) && !fs.statSync(path.join(targetDir, f)).isDirectory();
    });
    if (coverFile) {
      cover = `/_manga/${slug}/${coverFile}`;
    }
  }
  const chapters = getLocalMangaChapters(slug);
  return {
    id: slug,
    slug,
    title,
    author,
    description,
    cover,
    tags,
    chapterCount: chapters.length,
    chapters
  };
}
function getLocalMangaChapters(slug) {
  const mangaDir = getMangaDir();
  const targetDir = path.join(mangaDir, slug);
  if (!fs.existsSync(targetDir)) return [];
  const entries = fs.readdirSync(targetDir, { withFileTypes: true });
  const chapterFolders = entries.filter((e) => e.isDirectory()).sort((a, b) => {
    const numA = parseFloat(a.name.replace(/\D/g, "") || "0");
    const numB = parseFloat(b.name.replace(/\D/g, "") || "0");
    return numA - numB;
  });
  return chapterFolders.map((c, idx) => {
    const chapterPath = path.join(targetDir, c.name);
    const files = fs.readdirSync(chapterPath).filter((f) => {
      const l = f.toLowerCase();
      return l.endsWith(".jpg") || l.endsWith(".jpeg") || l.endsWith(".png") || l.endsWith(".webp");
    });
    const chapterNum = parseFloat(c.name.replace(/\D/g, "") || String(idx + 1));
    return {
      id: c.name,
      title: c.name.replace(/_/g, " ").replace(/-/g, " "),
      file: c.name,
      chapterNumber: chapterNum,
      pageCount: files.length
    };
  });
}
function getMangaChapterPages(slug, chapter) {
  const mangaDir = getMangaDir();
  const chapterDir = path.join(mangaDir, slug, chapter);
  if (!fs.existsSync(chapterDir)) return [];
  const files = fs.readdirSync(chapterDir).filter((f) => {
    const l = f.toLowerCase();
    return l.endsWith(".jpg") || l.endsWith(".jpeg") || l.endsWith(".png") || l.endsWith(".webp");
  }).sort((a, b) => {
    const numA = parseInt(a.replace(/\D/g, "") || "0", 10);
    const numB = parseInt(b.replace(/\D/g, "") || "0", 10);
    return numA - numB;
  });
  return files.map((f) => `/_manga/${encodeURIComponent(slug)}/${encodeURIComponent(chapter)}/${encodeURIComponent(f)}`);
}

export { getMangaChapterPages as a, getLocalMangaChapters as b, getMangaDir as c, getLocalMangaDetail as g, listLocalManga as l };
//# sourceMappingURL=manga.mjs.map
