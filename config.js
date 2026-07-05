const path = require('path');

module.exports = {
  PORT: process.env.PORT || 3000,

  // Kategori Utama dan lokasi foldernya
  CATEGORIES: [
    { 
      id: 'anime', 
      name: 'List Anime', 
      icon: 'film', 
      path: 'D:\\Video' 
    },
    { 
      id: 'youtube', 
      name: 'List YouTube', 
      icon: 'youtube', 
      path: 'D:\\YouTube' 
    },
    { 
      id: 'facebook', 
      name: 'List Facebook', 
      icon: 'facebook', 
      path: 'D:\\Facebook' 
    }
  ],

  // Format video yang didukung
  SUPPORTED_FORMATS: ['.mp4', '.mkv'],

  // Direktori untuk menyimpan cache thumbnail
  THUMBNAIL_DIR: path.join(__dirname, 'cache', 'thumbnails'),

  // Direktori untuk menyimpan file hasil share (upload)
  UPLOAD_DIR: path.join(__dirname, 'uploads'),

  // Cache TTL dalam milidetik (1 menit)
  CACHE_TTL: 60000,

  // --- Novel Configurations ---
  NOVEL_DIR: path.join(__dirname, 'data', 'novels'),
  NOVEL_THUMBNAILS_DIR: path.join(__dirname, 'data', 'novels', 'thumbnails'),
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY',
};
