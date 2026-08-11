const BaseSource = require('./BaseSource');
const path = require('path');
const fs = require('fs');

class DreamySource extends BaseSource {
  constructor() {
    super();
    this.id = 'dreamy';
    this.name = 'Dreamy Translations';
    this.baseUrl = 'https://dreamy-translations.com';
    this.lang = 'id';
  }

  /**
   * Search novels (menggunakan local catalog.html)
   */
  async search(query, page = 1) {
    try {
      // Baca file catalog.html lokal
      const catalogPath = path.join(__dirname, '../../scripts/catalog.html');
      if (!fs.existsSync(catalogPath)) {
        return [];
      }

      const html = fs.readFileSync(catalogPath, 'utf-8');
      const $ = this.parseHTML(html);
      
      const results = [];
      $('a[href^="/novel/"]').each((i, el) => {
        const href = $(el).attr('href');
        const slug = href.replace('/novel/', '').replace(/\//g, '');
        if (!slug || slug.includes('chapter')) return;

        const title = $(el).find('h3').first().text().trim();
        let cover = $(el).find('img').last().attr('src');
        if (!cover) cover = $(el).find('img').first().attr('src');

        if (slug && title) {
          // Filter berdasarkan query
          if (title.toLowerCase().includes(query.toLowerCase())) {
            results.push({
              title,
              slug,
              cover: cover ? (cover.startsWith('/') ? this.baseUrl + cover : cover) : null,
              author: '',
              source: this.id
            });
          }
        }
      });

      return results;
    } catch (error) {
      console.error('Dreamy search error:', error.message);
      return [];
    }
  }

  /**
   * Get novel detail dari halaman source
   */
  async getNovelDetail(slug) {
    try {
      const sourceUrl = `${this.baseUrl}/novel/${slug}`;
      const html = await this.fetch(sourceUrl);
      const $ = this.parseHTML(html);

      // Extract metadata
      let author = '';
      $('p').each((i, el) => {
        const text = $(el).text().trim();
        if (text.startsWith('by ')) author = text.replace('by ', '').trim();
      });

      let description = '';
      let descHtml = $('div.text-base.text-muted-foreground.leading-relaxed').first().html();
      if (descHtml) {
        description = descHtml;
      } else {
        description = $('meta[name="description"]').attr('content') || '';
      }

      const tagsSet = new Set();
      $('span.rounded-full.text-xs.font-medium').each((i, el) => {
        tagsSet.add($(el).text().trim());
      });

      const hashtagsSet = new Set();
      $('span.text-xs.text-muted-foreground\\/70').each((i, el) => {
        const text = $(el).text().trim();
        if (text.startsWith('#')) hashtagsSet.add(text);
      });

      // Extract chapters
      const chapters = [];
      $('a[href^="/novel/' + slug + '/"]').each((i, el) => {
        const href = $(el).attr('href');
        const match = href.match(/\/novel\/.+?\/(.+)$/);
        if (match) {
          const chapterFile = match[1];
          const chapterTitle = $(el).text().trim() || `Chapter ${chapters.length + 1}`;
          chapters.push({
            title: chapterTitle,
            file: chapterFile,
            url: this.baseUrl + href
          });
        }
      });

      return {
        title: $('h1').first().text().trim() || slug,
        author,
        description,
        tags: Array.from(tagsSet),
        hashtags: Array.from(hashtagsSet),
        cover: $('img[alt]').first().attr('src'),
        chapters,
        sourceUrl,
        source: this.id
      };
    } catch (error) {
      console.error('Dreamy getNovelDetail error:', error.message);
      throw error;
    }
  }

  /**
   * Get chapter content
   */
  async getChapterContent(slug, chapterFile) {
    try {
      const chapterUrl = `${this.baseUrl}/novel/${slug}/${chapterFile}`;
      const html = await this.fetch(chapterUrl);
      const $ = this.parseHTML(html);

      const content = [];
      
      // Extract chapter title
      const title = $('h1').first().text().trim();

      // Extract main content
      const contentDiv = $('div.prose, article, div.content, div.chapter-content').first();
      if (contentDiv.length === 0) {
        console.warn(`No content container found for ${chapterUrl}`);
        return [{ type: 'text', value: 'Konten chapter tidak ditemukan.' }];
      }

      contentDiv.children().each((i, el) => {
        const $el = $(el);

        if ($el.is('p') || $el.is('div')) {
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
              value: src.startsWith('/') ? this.baseUrl + src : src
            });
          }
        }
      });

      return content.length > 0 ? content : [{ type: 'text', value: 'Konten chapter kosong.' }];
    } catch (error) {
      console.error('Dreamy getChapterContent error:', error.message);
      throw error;
    }
  }
}

module.exports = DreamySource;
