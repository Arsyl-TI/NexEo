import axios from 'axios';
import * as cheerio from 'cheerio';

const NOVEL_SOURCES = [
  { id: "dreamy-translations", name: "Dreamy Translations", url: "https://dreamy-translations.com" },
  { id: "noveldex", name: "Noveldex", url: "https://noveldex.io" }
];
function extractNextData(html) {
  try {
    const $ = cheerio.load(html);
    const script = $("#__NEXT_DATA__").html();
    if (script) {
      return JSON.parse(script);
    }
  } catch {
  }
  return null;
}
async function scrapeDreamyCatalog() {
  var _a, _b, _c, _d, _e, _f, _g;
  const baseUrl = "https://dreamy-translations.com";
  try {
    const response = await axios.get(`${baseUrl}/series`, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
      timeout: 3e4
    });
    const html = response.data;
    const libraryMap = /* @__PURE__ */ new Map();
    const coverMap = /* @__PURE__ */ new Map();
    const coverRegex = /\\"(\d+)\\":\\"(https:\/\/[^\\"]*?\/(?:covers|storage)\/[^\\"]+)\\"/gi;
    let cMatch;
    while ((cMatch = coverRegex.exec(html)) !== null) {
      coverMap.set(cMatch[1], cMatch[2].replace(/\\\\/g, "").replace(/\\"/g, ""));
    }
    const directCoverMatches = [...html.matchAll(/(https:\/\/supabase\.dreamy-translations\.com\/storage\/v1\/object\/public\/covers\/\d+\/[^\\"\s<>]+)/gi)];
    for (const dMatch of directCoverMatches) {
      const cleanUrl = dMatch[1].replace(/\\/g, "");
      const idMatch = cleanUrl.match(/\/covers\/(\d+)\//);
      if (idMatch && idMatch[1] && !coverMap.has(idMatch[1])) {
        coverMap.set(idMatch[1], cleanUrl);
      }
    }
    const seriesRegex = /\\"id\\":(\d+),\\"title\\":\\"((?:\\\\.|[^\\"])*)\\",\\"slug\\":\\"([^\\"]+)\\"/g;
    let sMatch;
    while ((sMatch = seriesRegex.exec(html)) !== null) {
      try {
        const id = sMatch[1];
        const rawTitle = sMatch[2];
        const title = JSON.parse(`"${rawTitle}"`);
        const slug = sMatch[3];
        const cover = coverMap.get(id);
        if (slug && !libraryMap.has(slug)) {
          libraryMap.set(slug, {
            id: slug,
            slug,
            title: title || `Novel ${slug}`,
            sourceUrl: `${baseUrl}/novel/${slug}`,
            cover: cover || void 0
          });
        }
      } catch {
      }
    }
    const nextData = extractNextData(html);
    const seriesList = ((_b = (_a = nextData == null ? void 0 : nextData.props) == null ? void 0 : _a.pageProps) == null ? void 0 : _b.series) || ((_e = (_d = (_c = nextData == null ? void 0 : nextData.props) == null ? void 0 : _c.pageProps) == null ? void 0 : _d.initialState) == null ? void 0 : _e.series) || ((_g = (_f = nextData == null ? void 0 : nextData.props) == null ? void 0 : _f.pageProps) == null ? void 0 : _g.novels);
    if (Array.isArray(seriesList) && seriesList.length > 0) {
      for (const item of seriesList) {
        if (item.slug) {
          let cover = item.cover || item.coverUrl || item.image || (item.id ? coverMap.get(String(item.id)) : void 0);
          if (cover && !cover.startsWith("http")) {
            cover = `${baseUrl}/${cover.replace(/^\//, "")}`;
          }
          const existing = libraryMap.get(item.slug);
          if (existing) {
            if (cover) existing.cover = cover;
          } else {
            libraryMap.set(item.slug, {
              id: item.slug,
              slug: item.slug,
              title: item.title || `Novel ${item.slug}`,
              author: item.author,
              description: item.description,
              cover: cover || void 0,
              sourceUrl: `${baseUrl}/novel/${item.slug}`
            });
          }
        }
      }
    }
    return Array.from(libraryMap.values());
  } catch (err) {
    console.warn(`[CatalogScraper] Dreamy Translations unavailable: ${err == null ? void 0 : err.message}`);
    return [];
  }
}
async function scrapeDreamyNovelDetail(slug) {
  var _a, _b;
  const baseUrl = "https://dreamy-translations.com";
  const sourceUrl = `${baseUrl}/novel/${slug}`;
  const response = await axios.get(sourceUrl, {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
    timeout: 15e3
  });
  const html = response.data;
  const $ = cheerio.load(html);
  let title = $("h1").first().text().trim() || slug;
  let cover = $('img[src*="covers/"]').first().attr("src");
  let author = "";
  let description = "";
  const tagsSet = /* @__PURE__ */ new Set();
  const chapters = [];
  const nextData = extractNextData(html);
  const pageProps = (_a = nextData == null ? void 0 : nextData.props) == null ? void 0 : _a.pageProps;
  const novelObj = (pageProps == null ? void 0 : pageProps.novel) || (pageProps == null ? void 0 : pageProps.series) || ((_b = pageProps == null ? void 0 : pageProps.initialState) == null ? void 0 : _b.novel);
  if (novelObj) {
    if (novelObj.title) title = novelObj.title;
    if (novelObj.author) author = novelObj.author;
    if (novelObj.description) description = novelObj.description;
    if (novelObj.cover) cover = novelObj.cover;
    if (Array.isArray(novelObj.tags)) {
      novelObj.tags.forEach((t) => tagsSet.add(typeof t === "string" ? t : t.name || ""));
    }
    if (Array.isArray(novelObj.chapters) && novelObj.chapters.length > 0) {
      novelObj.chapters.forEach((ch, i) => {
        const chTitle = ch.title || ch.name || `Chapter ${i + 1}`;
        const chSlug = ch.slug || ch.id || `${i + 1}`;
        const chUrl = ch.url || `${baseUrl}/read/${slug}/${chSlug}`;
        chapters.push({
          title: chTitle,
          url: chUrl.startsWith("http") ? chUrl : `${baseUrl}${chUrl.startsWith("/") ? "" : "/"}${chUrl}`,
          file: `chapter-${i + 1}.json`
        });
      });
    }
  }
  if (cover && cover.startsWith("//")) cover = "https:" + cover;
  if (cover && cover.startsWith("/")) cover = baseUrl + cover;
  if (!author) {
    $("p").each((_, el) => {
      const text = $(el).text().trim();
      if (text.startsWith("by ")) author = text.replace("by ", "").trim();
    });
  }
  if (!description) {
    const descEl = $("div.text-base.text-muted-foreground.leading-relaxed").first();
    description = descEl.length ? descEl.html() || "" : $('meta[name="description"]').attr("content") || "";
  }
  if (tagsSet.size === 0) {
    $("span.rounded-full.text-xs.font-medium").each((_, el) => {
      const tag = $(el).text().trim();
      if (tag) tagsSet.add(tag);
    });
  }
  if (chapters.length === 0) {
    $("a[href]").each((i, el) => {
      const href = $(el).attr("href") || "";
      const chTitle = $(el).text().trim() || `Chapter ${i + 1}`;
      if (href.includes("/read/") || href.includes("/chapter") || href.includes(slug) && href !== `/novel/${slug}`) {
        const fullUrl = href.startsWith("http") ? href : `${baseUrl}${href.startsWith("/") ? "" : "/"}${href}`;
        if (!chapters.some((c) => c.url === fullUrl)) {
          chapters.push({
            title: chTitle,
            url: fullUrl,
            file: `chapter-${chapters.length + 1}.json`
          });
        }
      }
    });
  }
  return {
    id: slug,
    slug,
    title,
    author,
    description,
    tags: Array.from(tagsSet),
    cover: cover || void 0,
    sourceUrl,
    chapters
  };
}
async function scrapeNoveldexCatalog() {
  var _a, _b;
  const baseUrl = "https://noveldex.io";
  const novelsMap = /* @__PURE__ */ new Map();
  try {
    for (let page = 1; page <= 10; page++) {
      const res = await axios.get(`${baseUrl}/api/series?page=${page}&limit=100`, {
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
        timeout: 15e3
      });
      const items = ((_a = res.data) == null ? void 0 : _a.data) || ((_b = res.data) == null ? void 0 : _b.series) || (Array.isArray(res.data) ? res.data : []);
      if (!Array.isArray(items) || items.length === 0) break;
      let addedInThisPage = 0;
      for (const item of items) {
        const slug = item.urlSlug || item.slug;
        if (slug && !novelsMap.has(slug)) {
          let cover = void 0;
          if (item.coverImage) {
            cover = item.coverImage.startsWith("http") ? item.coverImage : `${baseUrl}${item.coverImage}`;
          }
          novelsMap.set(slug, {
            id: slug,
            slug,
            title: item.title || slug,
            author: item.author || void 0,
            cover,
            sourceUrl: `${baseUrl}/series/novel/${slug}`
          });
          addedInThisPage++;
        }
      }
      if (addedInThisPage === 0) break;
    }
    if (novelsMap.size > 0) {
      return Array.from(novelsMap.values());
    }
  } catch (err) {
    console.warn(`[CatalogScraper] Noveldex API error, using HTML fallback: ${err == null ? void 0 : err.message}`);
  }
  try {
    const response = await axios.get(`${baseUrl}/series`, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
      timeout: 15e3
    });
    const $ = cheerio.load(response.data);
    $('a[href*="/series/novel/"]').each((_, el) => {
      var _a2, _b2, _c;
      const href = $(el).attr("href") || "";
      if (!href.includes("/chapter/")) {
        const slug = (_b2 = (_a2 = href.split("/series/novel/")[1]) == null ? void 0 : _a2.split("?")[0]) == null ? void 0 : _b2.split("/")[0];
        if (slug && !novelsMap.has(slug)) {
          let img = $(el).find("img").attr("src") || $(el).closest("div").find("img").attr("src");
          let cover = void 0;
          if (img) {
            if (img.includes("url=")) {
              const rawUrl = (_c = img.split("url=")[1]) == null ? void 0 : _c.split("&")[0];
              if (rawUrl) cover = decodeURIComponent(rawUrl);
            } else {
              cover = img.startsWith("/") ? `${baseUrl}${img}` : img;
            }
          }
          const altTitle = $(el).find("img").attr("alt");
          const textTitle = $(el).text().trim();
          const title = altTitle || (textTitle && textTitle !== "WEB NOVEL" ? textTitle : slug);
          novelsMap.set(slug, {
            id: slug,
            slug,
            title,
            cover,
            sourceUrl: `${baseUrl}/series/novel/${slug}`
          });
        }
      }
    });
  } catch {
  }
  return Array.from(novelsMap.values());
}
async function scrapeNoveldexNovelDetail(slug) {
  const baseUrl = "https://noveldex.io";
  const sourceUrl = `${baseUrl}/series/novel/${slug}`;
  const response = await axios.get(sourceUrl, {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
    timeout: 2e4
  });
  const html = response.data;
  const $ = cheerio.load(html);
  let title = $("h1").first().text().trim() || slug;
  let cover = void 0;
  const imgEl = $('img[alt*="' + title + '"]').first() || $("img").first();
  let imgSrc = imgEl.attr("src");
  if (imgSrc) {
    if (imgSrc.includes("url=")) {
      cover = decodeURIComponent(imgSrc.split("url=")[1].split("&")[0]);
    } else {
      cover = imgSrc.startsWith("/") ? `${baseUrl}${imgSrc}` : imgSrc;
    }
  }
  let description = $('meta[name="description"]').attr("content") || "";
  let author = "";
  $("p, div, span").each((_, el) => {
    const text = $(el).text().trim();
    if (text.startsWith("Author:") || text.startsWith("Author :")) {
      author = text.replace(/Author\s*:/i, "").trim();
    }
  });
  const chapters = [];
  const chaptersMatch = html.match(/\\"chapters\\":(\[\{[\s\S]*?\}\])/);
  if (chaptersMatch) {
    try {
      const jsonStr = chaptersMatch[1].replace(/\\\\/g, "\\").replace(/\\"/g, '"');
      const parsedChapters = JSON.parse(jsonStr);
      if (Array.isArray(parsedChapters)) {
        parsedChapters.forEach((ch, idx) => {
          var _a;
          const chNum = (_a = ch.number) != null ? _a : idx + 1;
          const chTitle = ch.title || `Chapter ${chNum}`;
          const chUrl = `${baseUrl}/series/novel/${slug}/chapter/${chNum}`;
          chapters.push({
            title: chTitle,
            url: chUrl,
            file: `chapter-${chNum}.json`
          });
        });
      }
    } catch {
    }
  }
  if (chapters.length === 0) {
    $('a[href*="/chapter/"]').each((i, el) => {
      const href = $(el).attr("href") || "";
      const chTitle = $(el).text().trim() || `Chapter ${i + 1}`;
      if (href) {
        const fullUrl = href.startsWith("http") ? href : `${baseUrl}${href.startsWith("/") ? "" : "/"}${href}`;
        if (!chapters.some((c) => c.url === fullUrl)) {
          chapters.push({
            title: chTitle,
            url: fullUrl,
            file: `chapter-${chapters.length + 1}.json`
          });
        }
      }
    });
  }
  return {
    id: slug,
    slug,
    title,
    author,
    description,
    tags: [],
    cover: cover || void 0,
    sourceUrl,
    chapters
  };
}
async function getSourceCatalog(sourceId) {
  if (sourceId === "dreamy-translations") {
    return await scrapeDreamyCatalog();
  } else if (sourceId === "noveldex") {
    return await scrapeNoveldexCatalog();
  }
  return [];
}

export { NOVEL_SOURCES as N, scrapeDreamyNovelDetail as a, getSourceCatalog as g, scrapeNoveldexNovelDetail as s };
//# sourceMappingURL=catalogScraper.mjs.map
