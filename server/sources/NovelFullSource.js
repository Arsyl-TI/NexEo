const BaseSource = require('./BaseSource');

/**
 * NovelFullSource - Scraper untuk novelfull.com
 * Contoh plugin kedua untuk mendemonstrasikan extensibility
 */
class NovelFullSource extends BaseSource {
  constructor() {
    super();
    this.id = 'novelfull';
    this.name = 'NovelFull';
    this.baseUrl = 'https://novelfull.com';
    this.lang = 'en';
  }

  /**
   * Search novels dari NovelFull
   */
  async search(query, page = 1) {
    try {
      const searchUrl = `${this.baseUrl}/search?keyword=${encodeURIComponent(query)}&page=${page}`;
      const html = await this.fetch(searchUrl);
      const $ = this.parseHTML(html);

      const results = [];
      $('.list.list-storylist .row').each((i, el) => {
        const $el = $(el);
        
        const titleEl = $el.find('h3.story_name a');
        const title = titleEl.text().trim();
        const href = titleEl.attr('href');
        
        if (!href || !title) return;
        
        // Extract slug dari URL: https://novelfull.com/novel-name.html
        const slug = href.split('/').pop().replace('.html', '');
        
        const cover = $el.find('img').attr('src') || null;
        const author = $el.find('.author').text().replace('By ', '').trim() || 'Unknown';
        
        results.push({
          title,
          slug,
          cover: cover ? (cover.startsWith('http') ? cover : this.baseUrl + cover) : null,
          author,
          source: this.id
        });
      });

      return results;
    } catch (error) {
      console.error('NovelFull search error:', error.message);
      return [];
    }
  }

  /**
   * Get novel detail
   */
  async getNovelDetail(slug) {
    try {
      const novelUrl = `${this.baseUrl}/novel/${slug}.html`;
      const html = await this.fetch(novelUrl);
      const $ = this.parseHTML(html);

      // Extract metadata
      const title = $('h1.title').text().trim() || slug;
      const author = $('a.author').text().trim() || 'Unknown';
      
      let description = '';
      const descEl = $('div.desc-text');
      if (descEl.length > 0) {
        description = descEl.html() || '';
      }

      // Extract tags
      const tags = [];
      $('a.category').each((i, el) => {
        const tag = $(el).text().trim();
        if (tag) tags.push(tag);
      });

      // Extract cover
      const cover = $('img.book-cover').attr('src') || null;

      // Extract chapters
      const chapters = [];
      $('a.chapter-link').each((i, el) => {
        const href = $(el).attr('href');
        const chapterTitle = $(el).text().trim();
        
        if (href) {
          // Extract chapter file from URL
          const chapterFile = href.split('/').pop().replace('.html', '');
          chapters.push({
            title: chapterTitle || `Chapter ${chapters.length + 1}`,
            file: chapterFile,
            url: href.startsWith('http') ? href : this.baseUrl + href
          });
        }
      });

      return {
        title,
        author,
        description,
        tags,
        cover: cover ? (cover.startsWith('http') ? cover : this.baseUrl + cover) : null,
        chapters,
        sourceUrl: novelUrl,
        source: this.id
      };
    } catch (error) {
      console.error('NovelFull getNovelDetail error:', error.message);
      throw error;
    }
  }

  /**
   * Get chapter content
   */
  async getChapterContent(slug, chapterFile) {
    try {
      const chapterUrl = `${this.baseUrl}/novel/${slug}/${chapterFile}.html`;
      const html = await this.fetch(chapterUrl);
      const $ = this.parseHTML(html);

      const content = [];
      
      // Extract chapter title
      const title = $('h1.chapter-title').text().trim();

      // Extract main content
      const contentDiv = $('div.chapter-content, div.text-left.clearfix');
      
      if (contentDiv.length === 0) {
        console.warn(`No content container found for ${chapterUrl}`);
        return [{ type: 'text', value: 'Chapter content not found.' }];
      }

      contentDiv.children().each((i, el) => {
        const $el = $(el);

        if ($el.is('p')) {
          const text = $el.text().trim();
          if (text.length > 0) {
            content.push({
              type: 'text',
              value: text
            });
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

      return content.length > 0 ? content : [{ type: 'text', value: 'Chapter content is empty.' }];
    } catch (error) {
      console.error('NovelFull getChapterContent error:', error.message);
      throw error;
    }
  }
}

module.exports = NovelFullSource;
