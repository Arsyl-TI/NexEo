const BaseSource = require('./BaseSource');

/**
 * ReadLightNovelSource - Scraper untuk readlightnovel.net
 * Contoh plugin ketiga dengan implementasi caching
 */
class ReadLightNovelSource extends BaseSource {
  constructor() {
    super();
    this.id = 'readlightnovel';
    this.name = 'ReadLightNovel';
    this.baseUrl = 'https://readlightnovel.net';
    this.lang = 'en';
    
    // Simple cache
    this.searchCache = new Map();
    this.detailCache = new Map();
    this.cacheExpiry = 3600000; // 1 hour
  }

  /**
   * Clear cache untuk entry tertentu atau semua
   */
  clearCache(key = null) {
    if (key) {
      this.searchCache.delete(key);
      this.detailCache.delete(key);
    } else {
      this.searchCache.clear();
      this.detailCache.clear();
    }
  }

  /**
   * Get dari cache dengan expiry check
   */
  getFromCache(cache, key) {
    const entry = cache.get(key);
    if (entry && Date.now() - entry.timestamp < this.cacheExpiry) {
      return entry.data;
    }
    cache.delete(key);
    return null;
  }

  /**
   * Set ke cache dengan timestamp
   */
  setInCache(cache, key, data) {
    cache.set(key, { data, timestamp: Date.now() });
  }

  /**
   * Search novels
   */
  async search(query, page = 1) {
    try {
      const cacheKey = `${query}_${page}`;
      const cached = this.getFromCache(this.searchCache, cacheKey);
      if (cached) return cached;

      const searchUrl = `${this.baseUrl}/search?q=${encodeURIComponent(query)}&page=${page}`;
      const html = await this.fetch(searchUrl);
      const $ = this.parseHTML(html);

      const results = [];
      $('.novel-item, .search-item').each((i, el) => {
        const $el = $(el);
        
        const titleEl = $el.find('h4 a, .novel-title a').first();
        const title = titleEl.text().trim();
        const href = titleEl.attr('href');
        
        if (!href || !title) return;
        
        // Extract slug
        const slug = href.split('/').filter(Boolean).pop().replace('.html', '');
        
        const cover = $el.find('img').attr('src') || null;
        const author = $el.find('.author').text().trim() || 'Unknown';
        
        results.push({
          title,
          slug,
          cover: cover ? (cover.startsWith('http') ? cover : this.baseUrl + cover) : null,
          author,
          source: this.id
        });
      });

      this.setInCache(this.searchCache, cacheKey, results);
      return results;
    } catch (error) {
      console.error('ReadLightNovel search error:', error.message);
      return [];
    }
  }

  /**
   * Get novel detail
   */
  async getNovelDetail(slug) {
    try {
      const cached = this.getFromCache(this.detailCache, slug);
      if (cached) return cached;

      const novelUrl = `${this.baseUrl}/novel/${slug}/`;
      const html = await this.fetch(novelUrl);
      const $ = this.parseHTML(html);

      const title = $('.page-title h1, h1.novel-name').text().trim() || slug;
      const author = $('span:contains("Author"), .author-name').text().replace('Author:', '').trim() || 'Unknown';
      
      let description = '';
      const descEl = $('.description, .novel-description, .about-novel');
      if (descEl.length > 0) {
        description = descEl.html() || '';
      }

      const tags = [];
      $('.genres a, .tags a, .categories a').each((i, el) => {
        const tag = $(el).text().trim();
        if (tag) tags.push(tag);
      });

      const cover = $('.book-cover img, .novel-image img').attr('src') || null;

      const chapters = [];
      $('.chapter-item a, .list-chapter a').each((i, el) => {
        const href = $(el).attr('href');
        const chapterTitle = $(el).text().trim();
        
        if (href && chapterTitle) {
          const chapterFile = href.split('/').filter(Boolean).pop().replace('.html', '');
          chapters.push({
            title: chapterTitle,
            file: chapterFile,
            url: href.startsWith('http') ? href : this.baseUrl + href
          });
        }
      });

      const detail = {
        title,
        author,
        description,
        tags,
        cover: cover ? (cover.startsWith('http') ? cover : this.baseUrl + cover) : null,
        chapters,
        sourceUrl: novelUrl,
        source: this.id,
        cachedAt: new Date().toISOString()
      };

      this.setInCache(this.detailCache, slug, detail);
      return detail;
    } catch (error) {
      console.error('ReadLightNovel getNovelDetail error:', error.message);
      throw error;
    }
  }

  /**
   * Get chapter content
   */
  async getChapterContent(slug, chapterFile) {
    try {
      const chapterUrl = `${this.baseUrl}/novel/${slug}/${chapterFile}/`;
      const html = await this.fetch(chapterUrl);
      const $ = this.parseHTML(html);

      const content = [];
      const contentDiv = $('#chapter-content, .chapter-content, .cha-content');
      
      if (contentDiv.length === 0) {
        return [{ type: 'text', value: 'Chapter content not found.' }];
      }

      contentDiv.children().each((i, el) => {
        const $el = $(el);
        if ($el.is('p')) {
          const text = $el.text().trim();
          if (text.length > 0) {
            content.push({ type: 'text', value: text });
          }
        } else if ($el.is('img')) {
          const src = $el.attr('src');
          if (src) {
            content.push({
              type: 'image',
              value: src.startsWith('http') ? src : this.baseUrl + src
            });
          }
        }
      });

      return content.length > 0 ? content : [{ type: 'text', value: 'Chapter is empty.' }];
    } catch (error) {
      console.error('ReadLightNovel getChapterContent error:', error.message);
      throw error;
    }
  }
}

module.exports = ReadLightNovelSource;
