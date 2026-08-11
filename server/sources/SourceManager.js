const fs = require('fs');
const path = require('path');

/**
 * SourceManager - Mengelola semua plugin sumber novel
 * Auto-loads semua source dari folder sources/
 */
class SourceManager {
  constructor() {
    this.sources = new Map();
    this.sourcesDir = path.join(__dirname, '../sources');
    this.globalCache = new Map();
    this.cacheStats = { hits: 0, misses: 0, totalSize: 0 };
    this.loadSources();
  }

  /**
   * Load semua source plugins dari folder sources/
   */
  loadSources() {
    try {
      if (!fs.existsSync(this.sourcesDir)) {
        console.warn(`Sources directory not found: ${this.sourcesDir}`);
        return;
      }

      const files = fs.readdirSync(this.sourcesDir);
      
      for (const file of files) {
        if (['BaseSource.js', 'SourceManager.js'].includes(file) || !file.endsWith('.js')) continue;

        try {
          const filePath = path.join(this.sourcesDir, file);
          const SourceClass = require(filePath);
          const instance = new SourceClass();

          if (!instance.id || !instance.name) {
            console.warn(`Source ${file} missing id or name property`);
            continue;
          }

          this.sources.set(instance.id, instance);
          console.log(`✅ Loaded source: ${instance.name} (${instance.id})`);
        } catch (error) {
          console.error(`Failed to load source ${file}:`, error.message);
        }
      }

      console.log(`\n📚 Total sources loaded: ${this.sources.size}`);
    } catch (error) {
      console.error('Error loading sources:', error.message);
    }
  }

  /**
   * Get specific source by id
   */
  getSource(sourceId) {
    return this.sources.get(sourceId);
  }

  /**
   * Get all available sources
   */
  getAllSources() {
    return Array.from(this.sources.values()).map(source => ({
      id: source.id,
      name: source.name,
      lang: source.lang,
      baseUrl: source.baseUrl
    }));
  }

  /**
   * Search across all sources
   */
  async searchAll(query, sourceIds = null) {
    const sources = sourceIds 
      ? sourceIds.map(id => this.getSource(id)).filter(Boolean)
      : Array.from(this.sources.values());

    const results = {};
    
    for (const source of sources) {
      try {
        results[source.id] = await source.search(query, 1);
      } catch (error) {
        console.error(`Search error in ${source.id}:`, error.message);
        results[source.id] = [];
      }
    }

    return results;
  }

  /**
   * Search in specific source
   */
  async search(sourceId, query, page = 1) {
    const source = this.getSource(sourceId);
    if (!source) {
      throw new Error(`Source ${sourceId} not found`);
    }

    const key = `search_${sourceId}_${query}_${page}`;
    const cached = this.getFromGlobalCache(key);
    if (cached) {
      this.cacheStats.hits++;
      return cached;
    }
    this.cacheStats.misses++;
    const results = await source.search(query, page);
    this.setInGlobalCache(key, results);
    return results;
  }

  /**
   * Get novel detail dari cache jika ada
   */
  async getNovelDetail(sourceId, slug) {
    const source = this.getSource(sourceId);
    if (!source) {
      throw new Error(`Source ${sourceId} not found`);
    }

    const key = `detail_${sourceId}_${slug}`;
    const cached = this.getFromGlobalCache(key);
    if (cached) {
      this.cacheStats.hits++;
      return cached;
    }
    this.cacheStats.misses++;
    const detail = await source.getNovelDetail(slug);
    this.setInGlobalCache(key, detail);
    return detail;
  }

  /**
   * Get chapter content from specific source
   */
  async getChapterContent(sourceId, slug, chapterFile) {
    const source = this.getSource(sourceId);
    if (!source) {
      throw new Error(`Source ${sourceId} not found`);
    }

    return source.getChapterContent(slug, chapterFile);
  }

  // ============================================================
  // Global Cache Helpers
  // ============================================================

  getFromGlobalCache(key) {
    const entry = this.globalCache.get(key);
    if (entry && Date.now() - entry.timestamp < 3600000) {
      return entry.data;
    }
    this.globalCache.delete(key);
    return null;
  }

  setInGlobalCache(key, data) {
    const size = JSON.stringify(data).length;
    this.cacheStats.totalSize += size;
    this.globalCache.set(key, { data, timestamp: Date.now(), size });
  }

  clearGlobalCache(sourceId = null) {
    if (sourceId) {
      const prefix = `_${sourceId}_`;
      for (const key of this.globalCache.keys()) {
        if (key.includes(prefix)) {
          this.globalCache.delete(key);
        }
      }
    } else {
      this.globalCache.clear();
      this.cacheStats.totalSize = 0;
    }
  }

  getCacheStats() {
    const total = this.cacheStats.hits + this.cacheStats.misses;
    const hitRate = total > 0 ? ((this.cacheStats.hits / total) * 100).toFixed(2) : '0.00';
    return {
      hits: this.cacheStats.hits,
      misses: this.cacheStats.misses,
      hitRate: `${hitRate}%`,
      totalSize: `${(this.cacheStats.totalSize / 1024).toFixed(2)} KB`,
      entriesCount: this.globalCache.size
    };
  }

  /**
   * Register a new source instance programmatically
   */
  registerSource(sourceInstance) {
    if (!sourceInstance.id || !sourceInstance.name) {
      throw new Error('Source must have id and name properties');
    }

    this.sources.set(sourceInstance.id, sourceInstance);
    console.log(`✅ Registered source: ${sourceInstance.name} (${sourceInstance.id})`);
  }

  /**
   * Unregister a source
   */
  unregisterSource(sourceId) {
    if (this.sources.has(sourceId)) {
      const source = this.sources.get(sourceId);
      this.sources.delete(sourceId);
      console.log(`❌ Unregistered source: ${source.name} (${sourceId})`);
      return true;
    }
    return false;
  }
}

// Singleton instance
let instance = null;

function getSourceManager() {
  if (!instance) {
    instance = new SourceManager();
  }
  return instance;
}

module.exports = { SourceManager, getSourceManager };
