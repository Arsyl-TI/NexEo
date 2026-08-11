<template>
  <div class="novel-detail relative min-h-screen">
    <div class="absolute inset-0 top-0 left-0 right-0 h-screen overflow-hidden pointer-events-none z-0">
      <div 
        v-if="novel?.localThumbnail" 
        class="absolute inset-[-50px] opacity-30 blur-3xl h-[120%]" 
        :style="{ 
          backgroundImage: `url('/api/novels/static/${novel.localThumbnail}')`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          maskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)'
        }"
      ></div>
    </div>
    <div class="max-w-5xl mx-auto relative z-10 pt-2">
      <router-link to="/novels" class="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-card/80 hover:bg-border/80 border border-border/60 text-card-foreground hover:text-foreground text-sm font-medium transition-all shadow-md backdrop-blur-sm">â† Kembali</router-link>
      <div v-if="loading" class="flex justify-center py-20"><div class="spinner"></div></div>
      <div v-else-if="!novel" class="text-center py-20 text-muted-foreground">Novel tidak ditemukan.</div>
      <div v-else>
        <header class="relative z-10 flex flex-col md:flex-row gap-8 mb-8 pb-8">
          <div class="w-52 sm:w-56 flex-shrink-0 mx-auto md:mx-0">
            <div class="aspect-[2/3] rounded-xl overflow-hidden border border-border/80 shadow-2xl bg-card">
              <img v-if="novel.localThumbnail" :src="`/api/novels/static/${novel.localThumbnail}`" class="object-cover w-full h-full">
              <div v-else class="flex items-center justify-center h-full text-muted-foreground">No Cover</div>
            </div>
            <div class="mt-4 text-center bg-card/60 border border-border/50 rounded-xl p-3">
              <b class="text-primary text-lg">{{ chapters.length }}</b>
              <div class="text-xs text-muted-foreground font-medium">Chapters</div>
            </div>
          </div>
          <div class="flex-1 text-center md:text-left flex flex-col justify-between">
            <div>
              <h1 class="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-2 leading-tight">{{ novel.title }}</h1>
              <p v-if="novel.author" class="text-muted-foreground text-sm mb-4">by <span class="text-primary font-semibold">{{ novel.author }}</span></p>
              <div v-if="novel.tags?.length" class="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
                <span v-for="tag in novel.tags" :key="tag" class="bg-primary/10 border border-primary/30 text-primary px-3 py-1 rounded-full text-xs font-medium">{{ tag }}</span>
              </div>
            </div>

            <div>
              <!-- Action Buttons: Resume / Start Reading -->
              <div class="flex flex-wrap gap-3 justify-center md:justify-start mb-6">
                <router-link 
                  v-if="hasResumeChapter" 
                  :to="`/novels/${slug}/${resumeChapter}`" 
                  class="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-foreground px-6 py-3 rounded-xl font-medium shadow-lg shadow-brand/30 transition-all text-sm"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path></svg>
                  Lanjutkan Membaca
                </router-link>
                <router-link 
                  v-else-if="chapters.length > 0" 
                  :to="`/novels/${slug}/${chapters[0].file}`" 
                  class="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-foreground px-6 py-3 rounded-xl font-medium shadow-lg shadow-brand/30 transition-all text-sm"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                  Mulai Baca Bab 1
                </router-link>
              </div>

              <div class="h-px bg-border/50 mb-6"></div>
              <div class="text-card-foreground text-sm leading-relaxed line-clamp-3" v-html="DOMPurify.sanitize(novel.description || 'Tidak ada sinopsis tersedia.')"></div>
            </div>
          </div>
        </header>
        <!-- Navigation Tabs -->
        <nav class="mb-6 border-b border-card flex gap-2">
          <button 
            v-for="tab in [{ id: 'chapters', label: 'Daftar Bab' }, { id: 'synopsis', label: 'Sinopsis Lengkap' }, { id: 'actions', label: 'Aksi' }]" 
            :key="tab.id" 
            @click="activeTab = tab.id" 
            :class="['px-5 py-3 text-sm font-medium border-b-2 transition-all', activeTab === tab.id ? 'border-primary text-primary font-semibold' : 'border-transparent text-muted-foreground hover:text-foreground']"
          >
            {{ tab.label }}
          </button>
        </nav>

        <section v-if="activeTab === 'chapters'">
          <div class="flex flex-col sm:flex-row gap-3 mb-6 bg-card/40 p-3.5 rounded-xl border border-border/50">
            <input v-model="chapterSearch" placeholder="Cari bab..." class="flex-1 px-4 py-2 bg-background border border-border/80 rounded-lg text-sm text-foreground focus:border-primary outline-none">
            <div class="relative w-full sm:w-40">
              <select v-model="chapterSort" class="w-full px-4 py-2 pr-8 bg-background border border-border/80 rounded-lg text-sm text-card-foreground appearance-none outline-none cursor-pointer">
                <option value="asc">Terlama</option>
                <option value="desc">Terbaru</option>
              </select>
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-muted-foreground">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>
          <div v-if="!filteredChapters.length" class="text-center py-12 text-muted-foreground bg-card/20 rounded-xl border border-card">{{ chapters.length ? 'Bab tidak ditemukan' : 'Bab belum diunduh secara lokal.' }}</div>
          <div v-else class="space-y-2.5">
            <router-link v-for="chapter in filteredChapters" :key="chapter.id" :to="`/novels/${slug}/${chapter.file}`" class="group flex items-center gap-4 p-4 bg-card/50 hover:bg-card rounded-xl border border-border/60 hover:border-primary/50 transition-all">
              <span class="text-xs font-mono text-muted-foreground w-8 text-right">{{ chapter.id }}</span>
              <span class="flex-1 text-card-foreground group-hover:text-foreground text-sm font-medium truncate">{{ chapter.title }}</span>
              <span class="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all">â†’</span>
            </router-link>
          </div>
        </section>

        <section v-else-if="activeTab === 'synopsis'" class="bg-card/50 border border-border/50 rounded-xl p-6">
          <h2 class="text-lg font-bold text-foreground mb-4">Sinopsis</h2>
          <div class="text-card-foreground text-sm leading-relaxed space-y-4" v-html="DOMPurify.sanitize(novel.description || 'Tidak ada sinopsis tersedia.')"></div>
        </section>

        <section v-else class="bg-card/50 border border-border/50 rounded-xl p-6 space-y-4">
          <h2 class="text-lg font-bold text-foreground">Aksi Novel</h2>
          <button @click="translateNovel" :disabled="isTranslating" class="w-full text-left p-4 rounded-xl bg-primary/20 border border-primary/30 hover:bg-primary/30 text-primary disabled:opacity-50 transition-all text-sm font-medium">
            {{ isTranslating ? 'Menerjemahkan...' : 'Translate Novel' }}
          </button>
          <a v-if="novel.sourceUrl" :href="novel.sourceUrl" target="_blank" class="block p-4 rounded-xl bg-border/40 hover:bg-border/60 border border-muted-foreground/40 text-card-foreground hover:text-foreground transition-all text-sm font-medium">
            Buka Sumber Asli â†—
          </a>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { useToast } from '../composables/useToast'
import DOMPurify from 'dompurify'

const { showToast } = useToast()
const route = useRoute()
const slug = route.params.slug

const novel = ref(null)
const chapters = ref([])
const loading = ref(true)
const resumeChapter = ref(null)
const isTranslating = ref(false)
const activeTab = ref('chapters')
const chapterSearch = ref('')
const chapterSort = ref('asc')

const hasResumeChapter = computed(() => {
  const savedChapter = typeof resumeChapter.value === 'string' ? resumeChapter.value.trim() : ''
  return Boolean(savedChapter) && chapters.value.some(chapter => chapter.file === savedChapter)
})
const filteredChapters = computed(() => {
  let list = [...chapters.value]
  if (chapterSearch.value.trim()) {
    const q = chapterSearch.value.toLowerCase()
    list = list.filter(c => c.title?.toLowerCase().includes(q))
  }
  if (chapterSort.value === 'desc') {
    list.reverse()
  }
  return list
})
const translateNovel = async () => {
  if (isTranslating.value) return
  isTranslating.value = true
  try {
    await axios.post(`/api/novels/${slug}/translate-all`)
    showToast("Translate started in background.", "info")
  } catch(e) {
    showToast("Failed to start translate", "error")
  }
  setTimeout(() => { isTranslating.value = false }, 5000)
}

onMounted(async () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const saved = localStorage.getItem(`resume_novel_${slug}`)
    if (saved && typeof saved === 'string') {
      resumeChapter.value = saved.trim()
    }
  }

  try {
    const libRes = await axios.get('/api/novels/library')
    const library = libRes.data
    novel.value = library.find(n => n.folderName === slug)

    const idxRes = await axios.get(`/api/novels/${slug}/index`)
    chapters.value = idxRes.data
  } catch(e) {
    console.error("Failed to load novel detail", e)
  } finally {
    loading.value = false
  }
})
</script>