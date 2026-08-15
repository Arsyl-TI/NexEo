import fs from 'fs';
import path from 'path';
import { s as serverConfig } from './config.mjs';

class NovelServerRepository {
  get novelDir() {
    return serverConfig.novel.dir;
  }
  ensureNovelDir(slug) {
    return path.join(this.novelDir, slug);
  }
  getIndexPath(slug) {
    return path.join(this.ensureNovelDir(slug), "master_index.json");
  }
  getMetadataPath(slug) {
    return path.join(this.ensureNovelDir(slug), "metadata.json");
  }
  getNovelDirs() {
    if (!fs.existsSync(this.novelDir)) {
      return [];
    }
    const entries = fs.readdirSync(this.novelDir, { withFileTypes: true });
    return entries.filter((entry) => entry.isDirectory() && entry.name !== "thumbnails").map((entry) => {
      var _a, _b, _c, _d;
      const slug = entry.name;
      const indexPath = this.getIndexPath(slug);
      const metadataPath = this.getMetadataPath(slug);
      let title = slug;
      let author;
      let tags = [];
      let cover = null;
      if (fs.existsSync(metadataPath)) {
        try {
          const metadata = JSON.parse(fs.readFileSync(metadataPath, "utf-8"));
          title = (_a = metadata.title) != null ? _a : title;
          author = metadata.author;
          tags = (_b = metadata.tags) != null ? _b : [];
          cover = (_c = metadata.coverUrl) != null ? _c : null;
        } catch {
        }
      }
      if (title === slug && fs.existsSync(indexPath)) {
        try {
          const index = JSON.parse(fs.readFileSync(indexPath, "utf-8"));
          if (index.length > 0 && index[0]) {
            title = (_d = index[0].title) != null ? _d : title;
          }
        } catch {
        }
      }
      const rootCover = path.join(this.ensureNovelDir(slug), "cover.jpg");
      const coversDir = path.join(this.ensureNovelDir(slug), "images");
      if (fs.existsSync(rootCover)) {
        cover = `/_novels/${slug}/cover.jpg`;
      } else if (fs.existsSync(coversDir)) {
        const coverFiles = fs.readdirSync(coversDir);
        const found = coverFiles.find((f) => f.toLowerCase().includes("cover") || f.toLowerCase().endsWith(".jpg") || f.toLowerCase().endsWith(".png"));
        if (found) {
          cover = `/_novels/${slug}/images/${found}`;
        }
      }
      return {
        id: slug,
        slug,
        title,
        author,
        tags,
        cover: cover != null ? cover : void 0
      };
    }).filter((item) => item.title);
  }
  getNovelMetadata(slug) {
    const metadataPath = this.getMetadataPath(slug);
    if (!fs.existsSync(metadataPath)) return null;
    try {
      return JSON.parse(fs.readFileSync(metadataPath, "utf-8"));
    } catch {
      return null;
    }
  }
  getMasterIndex(slug) {
    const indexPath = this.getIndexPath(slug);
    if (!fs.existsSync(indexPath)) return [];
    try {
      return JSON.parse(fs.readFileSync(indexPath, "utf-8"));
    } catch {
      return [];
    }
  }
  getChapterContent(slug, chapterId) {
    const safeChapter = path.basename(chapterId);
    const chapterPath = path.join(this.ensureNovelDir(slug), safeChapter.endsWith(".json") ? safeChapter : `${safeChapter}.json`);
    if (!fs.existsSync(chapterPath)) return null;
    try {
      return JSON.parse(fs.readFileSync(chapterPath, "utf-8"));
    } catch {
      return null;
    }
  }
}
const novelServerRepo = new NovelServerRepository();
function listLocalNovels() {
  return novelServerRepo.getNovelDirs().sort((a, b) => a.title.localeCompare(b.title));
}
function getLocalNovel(slug) {
  const novelDir = path.join(serverConfig.novel.dir, slug);
  if (!fs.existsSync(novelDir)) return null;
  const metadata = novelServerRepo.getNovelMetadata(slug);
  novelServerRepo.getMasterIndex(slug);
  let title = (metadata == null ? void 0 : metadata.title) || slug;
  let author = metadata == null ? void 0 : metadata.author;
  let tags = (metadata == null ? void 0 : metadata.tags) || [];
  let description = metadata == null ? void 0 : metadata.description;
  let sourceUrl = metadata == null ? void 0 : metadata.sourceUrl;
  let cover = (metadata == null ? void 0 : metadata.coverUrl) || null;
  const rootCover = path.join(novelDir, "cover.jpg");
  const coversDir = path.join(novelDir, "images");
  if (fs.existsSync(rootCover)) {
    cover = `/_novels/${slug}/cover.jpg`;
  } else if (fs.existsSync(coversDir)) {
    const coverFiles = fs.readdirSync(coversDir);
    const found = coverFiles.find((f) => f.toLowerCase().includes("cover") || f.toLowerCase().endsWith(".jpg") || f.toLowerCase().endsWith(".png"));
    if (found) {
      cover = `/_novels/${slug}/images/${found}`;
    }
  }
  const chapters = getLocalChapters(slug);
  return {
    id: slug,
    slug,
    title,
    author,
    description,
    sourceUrl,
    cover: cover || void 0,
    tags,
    chapters
  };
}
function getLocalChapters(slug) {
  const masterIndex = novelServerRepo.getMasterIndex(slug);
  if (masterIndex.length > 0) {
    return masterIndex.map((c) => ({
      id: String(c.id),
      title: c.title,
      file: c.file || `chapter-${c.id}.json`,
      number: c.number,
      url: c.url
    }));
  }
  const novelDir = path.join(serverConfig.novel.dir, slug);
  if (!fs.existsSync(novelDir)) return [];
  const files = fs.readdirSync(novelDir);
  const chapterFiles = files.filter((f) => {
    const l = f.toLowerCase();
    return (l.endsWith(".txt") || l.endsWith(".json")) && !l.includes("meta") && !l.includes("index") && !l.includes("cover");
  }).sort((a, b) => {
    const numA = parseInt(a.replace(/\D/g, "") || "0", 10);
    const numB = parseInt(b.replace(/\D/g, "") || "0", 10);
    return numA - numB;
  });
  return chapterFiles.map((fileName, idx) => ({
    id: String(idx + 1),
    title: fileName.replace(/\.(txt|json)$/i, ""),
    file: fileName,
    number: idx + 1
  }));
}
function getLocalChapterContent(slug, filename) {
  return novelServerRepo.getChapterContent(slug, filename);
}

export { getLocalChapterContent as a, getLocalChapters as b, getLocalNovel as g, listLocalNovels as l };
//# sourceMappingURL=novel.mjs.map
