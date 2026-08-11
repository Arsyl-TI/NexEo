/**
 * Base class untuk semua sumber novel
 * Setiap sumber (Dreamy, NovelFull, dll) harus extend class ini
 */
class BaseSource {
  constructor() {
    this.id = '';           // unique id: 'dreamy', 'novelfull', etc
    this.name = '';         // display name: 'Dreamy Translations', 'NovelFull'
    this.baseUrl = '';      // base URL sumber
    this.lang = 'id';       // language: 'id', 'en', etc
  }

  /**
   * Mencari novel berdasarkan query
   * @param {string} query - Kata kunci pencarian
   * @param {number} page - Halaman (default 1)
   * @returns {Promise<Array>} Array of { title, slug, cover, author }
   */
  async search(query, page = 1) {
    throw new Error('Method search() must be implemented');
  }

  /**
   * Mengambil detail novel
   * @param {string} slug - Novel slug/id
   * @returns {Promise<Object>} { title, author, description, tags, cover, chapters: [{title, file, url}] }
   */
  async getNovelDetail(slug) {
    throw new Error('Method getNovelDetail() must be implemented');
  }

  /**
   * Mengambil konten chapter
   * @param {string} slug - Novel slug
   * @param {string} chapterFile - Chapter identifier
   * @returns {Promise<Array>} Array of { type: 'text'|'image', value: '...' }
   */
  async getChapterContent(slug, chapterFile) {
    throw new Error('Method getChapterContent() must be implemented');
  }

  /**
   * Helper untuk request HTTP dengan retry
   */
  async fetch(url, options = {}) {
    const axios = require('axios');
    const defaultOptions = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 10000,
      ...options
    };

    try {
      const response = await axios.get(url, defaultOptions);
      return response.data;
    } catch (error) {
      console.error(`Fetch error for ${url}:`, error.message);
      throw error;
    }
  }

  /**
   * Helper untuk parse HTML
   */
  parseHTML(html) {
    const cheerio = require('cheerio');
    return cheerio.load(html);
  }

  /**
   * Helper untuk download file
   */
  async downloadFile(url, filepath) {
    const axios = require('axios');
    const fs = require('fs');

    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });

    return new Promise((resolve, reject) => {
      response.data.pipe(fs.createWriteStream(filepath))
        .on('finish', () => resolve())
        .on('error', e => reject(e));
    });
  }
}

module.exports = BaseSource;
