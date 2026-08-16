<template>
  <div class="min-h-screen bg-background text-foreground py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto space-y-8">

      <!-- Top Title Header & Search Bar -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card/60 border border-border/80 p-6 rounded-3xl backdrop-blur-xl shadow-xl">
        <div>
          <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <span>🎮</span>
            <span>NexEo Game Deals & Diskon Hub</span>
          </h1>
          <p class="text-xs text-muted-foreground mt-1 leading-relaxed max-w-2xl">
            Pantau promo diskon game PC & Konsol terbaru secara real-time dari Steam, Epic Games Store, Ubisoft Store, GOG, Microsoft Store, & Humble Store.
          </p>
        </div>

        <!-- Search Input -->
        <div class="relative w-full md:w-72 shrink-0">
          <input 
            v-model="searchQuery" 
            @keyup.enter="fetchDeals"
            type="text" 
            placeholder="Cari judul game (misal: Cyberpunk, GTA)..." 
            class="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-full text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary shadow-sm"
          />
          <span class="absolute left-3 top-2.5 text-xs text-muted-foreground">🔍</span>
        </div>
      </div>

      <!-- 🎁 WEEKLY FREE GAMES SPOTLIGHT HERO BANNER -->
      <div v-if="freebies.length > 0" class="bg-gradient-to-r from-emerald-950/40 via-card/80 to-indigo-950/40 border border-emerald-500/40 p-6 rounded-3xl shadow-2xl backdrop-blur-xl space-y-4 relative overflow-hidden">
        <div class="flex items-center justify-between">
          <h2 class="text-base font-bold text-foreground flex items-center gap-2">
            <span class="text-xl animate-bounce">🎁</span>
            <span class="text-emerald-400">Game Gratis Klaim Permanen Minggu Ini (100% OFF)</span>
          </h2>
          <span class="text-[11px] font-mono font-bold text-emerald-300 bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 rounded-full animate-pulse">
            {{ freebies.length }} Game Gratis Aktif
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div 
            v-for="item in freebies" 
            :key="item.id"
            class="bg-card/90 border border-emerald-500/50 rounded-2xl p-4 flex flex-col justify-between hover:border-emerald-400 transition-all shadow-lg group relative overflow-hidden"
          >
            <div>
              <div class="relative h-40 rounded-xl overflow-hidden mb-3 bg-black/50 border border-border/50">
                <img 
                  :src="item.thumb" 
                  :alt="item.title" 
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <span class="absolute top-2 left-2 bg-emerald-500 text-black font-extrabold text-[11px] px-2.5 py-0.5 rounded-md shadow-md uppercase font-mono">
                  100% GRATIS
                </span>
                <span class="absolute top-2 right-2 bg-black/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded border border-white/20">
                  {{ item.storeName }}
                </span>
              </div>

              <h3 class="text-sm font-bold text-foreground line-clamp-1 group-hover:text-emerald-300 transition-colors">
                {{ item.title }}
              </h3>
              <p class="text-xs text-muted-foreground mt-0.5 font-mono">
                Harga Normal: <span class="line-through text-rose-400">{{ formatPrice(item.normalPrice) }}</span> ➔ <span class="text-emerald-400 font-bold">GRATIS KLAIM</span>
              </p>
            </div>

            <a 
              :href="item.dealLink" 
              target="_blank" 
              rel="noopener noreferrer"
              class="mt-4 w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-1.5"
            >
              <span>🛒</span> Klaim Game Gratis
            </a>
          </div>
        </div>
      </div>

      <!-- Filters Toolbar (Store Tabs & Discount Filter Pills) -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card/40 border border-border/60 p-4 rounded-2xl backdrop-blur-xl">
        <!-- Store Selector Pills -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
          <button 
            v-for="s in stores" 
            :key="s.storeID"
            @click="selectStore(s.storeID)"
            :class="[
              'px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0 shadow-sm',
              selectedStoreID === s.storeID ? 'bg-primary text-white shadow-md' : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-border/60'
            ]"
          >
            <span>{{ s.icon }}</span>
            <span>{{ s.storeName }}</span>
          </button>
        </div>

        <!-- Discount Percentage Pills, Currency Switcher, & Wishlist Switcher -->
        <div class="flex items-center gap-2 shrink-0 flex-wrap">
          <!-- Currency Switcher Toggle -->
          <div class="flex items-center bg-card border border-border rounded-xl p-0.5 shadow-sm">
            <button 
              @click="selectedCurrency = 'IDR'" 
              :class="['px-2.5 py-1 rounded-lg text-xs font-bold transition-all', selectedCurrency === 'IDR' ? 'bg-primary text-white shadow-md' : 'text-muted-foreground hover:text-foreground']"
            >
              🇮🇩 IDR (Rp)
            </button>
            <button 
              @click="selectedCurrency = 'USD'" 
              :class="['px-2.5 py-1 rounded-lg text-xs font-bold transition-all', selectedCurrency === 'USD' ? 'bg-primary text-white shadow-md' : 'text-muted-foreground hover:text-foreground']"
            >
              💵 USD ($)
            </button>
          </div>

          <button 
            v-for="disc in [0, 50, 75]" 
            :key="disc"
            @click="minDiscount = disc; fetchDeals()"
            :class="[
              'px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all border',
              minDiscount === disc ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm' : 'bg-card border-border text-muted-foreground hover:text-foreground'
            ]"
          >
            {{ disc === 0 ? 'Semua Diskon' : `${disc}%+ OFF` }}
          </button>

          <button 
            @click="showWishlistOnly = !showWishlistOnly"
            :class="[
              'px-3 py-1 rounded-lg text-xs font-semibold transition-all border flex items-center gap-1',
              showWishlistOnly ? 'bg-rose-500 text-white border-rose-400 shadow-md' : 'bg-card border-border text-muted-foreground hover:text-foreground'
            ]"
          >
            <span>📌</span>
            <span>Wishlist ({{ wishlist.length }})</span>
          </button>

          <button 
            @click="showAlertsManagerModal = true"
            class="px-3 py-1 rounded-lg text-xs font-semibold transition-all border border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 flex items-center gap-1 shadow-sm"
          >
            <span>🔔</span>
            <span>Alert Diskon {{ priceAlerts.length > 0 ? `(${priceAlerts.length})` : '' }}</span>
          </button>
        </div>
      </div>

      <!-- MAIN GAME DEALS GRID -->
      <div>
        <div v-if="loading" class="flex justify-center py-20">
          <div class="spinner border-4 w-10 h-10"></div>
        </div>

        <div v-else-if="displayedDeals.length === 0" class="text-center py-20 bg-card/40 border border-border/80 rounded-3xl text-muted-foreground text-sm">
          <span class="text-4xl block mb-2">👾</span>
          Tidak ada diskon game yang cocok dengan pencarian atau filter pilihan.
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div 
            v-for="deal in displayedDeals" 
            :key="deal.id"
            class="bg-card/70 border border-border/80 rounded-2xl p-3.5 flex flex-col justify-between hover:border-primary/50 transition-all shadow-md group"
          >
            <div>
              <!-- Game Cover Artwork -->
              <div class="relative h-36 rounded-xl overflow-hidden mb-3 bg-black/40 border border-border/40">
                <img 
                  :src="deal.thumb" 
                  :alt="deal.title" 
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />

                <!-- Discount Tag & All-Time Low Badge -->
                <div class="absolute top-2 left-2 flex flex-col gap-1 items-start">
                  <span class="bg-rose-600 text-white font-mono font-extrabold text-xs px-2 py-0.5 rounded-md shadow-md">
                    -{{ deal.savings }}
                  </span>
                  <span v-if="deal.isAllTimeLow" class="bg-gradient-to-r from-amber-500 to-orange-500 text-black font-extrabold text-[9px] px-1.5 py-0.2 rounded shadow-md uppercase animate-pulse">
                    🔥 RECORD LOW
                  </span>
                </div>

                <!-- Store Name Badge -->
                <span class="absolute top-2 right-2 bg-black/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded border border-white/20">
                  {{ deal.storeName }}
                </span>

                <!-- Ratings Overlay -->
                <div class="absolute bottom-2 left-2 flex items-center gap-1.5 text-[10px] font-mono">
                  <span v-if="deal.metacriticScore" class="bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 px-1.5 py-0.5 rounded font-bold" title="Metacritic Score">
                    🎯 {{ deal.metacriticScore }}
                  </span>
                  <span v-if="deal.steamRatingPercent" class="bg-blue-950/90 text-blue-300 border border-blue-500/40 px-1.5 py-0.5 rounded font-bold" title="Steam Positive Reviews">
                    👍 {{ deal.steamRatingPercent }}
                  </span>
                </div>
              </div>

              <!-- Title & Price -->
              <h3 class="text-xs font-bold text-foreground line-clamp-2 min-h-[2rem] group-hover:text-primary transition-colors">
                {{ deal.title }}
              </h3>

              <div class="flex items-baseline justify-between mt-2 pt-2 border-t border-border/40">
                <span class="text-xs text-muted-foreground line-through font-mono">{{ formatPrice(deal.normalPrice) }}</span>
                <span class="text-sm font-bold text-amber-400 font-mono">{{ formatPrice(deal.salePrice) }}</span>
              </div>
            </div>

            <!-- Actions Bar -->
            <div class="mt-3 pt-2 flex items-center gap-2">
              <button 
                @click="toggleWishlist(deal)" 
                :class="[
                  'p-2 rounded-xl border transition-all text-xs',
                  isWishlisted(deal.id) ? 'bg-rose-500/20 text-rose-400 border-rose-500/40' : 'bg-card border-border text-muted-foreground hover:text-foreground'
                ]"
                :title="isWishlisted(deal.id) ? 'Hapus dari Wishlist' : 'Simpan ke Wishlist'"
              >
                {{ isWishlisted(deal.id) ? '❤️' : '🤍' }}
              </button>

              <button 
                @click="openSetAlertModal(deal)" 
                class="p-2 bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded-xl hover:bg-amber-500/20 transition-all text-xs"
                title="Set Notifikasi Target Harga"
              >
                🔔
              </button>

              <a 
                :href="deal.dealLink" 
                target="_blank" 
                rel="noopener noreferrer"
                class="flex-1 py-1.5 bg-primary hover:bg-primary/90 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1"
              >
                <span>🛒</span> Buka Deal
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Set Target Price Alert Modal -->
    <div 
      v-if="showSetAlertModal && dealForAlert" 
      class="fixed inset-0 z-50 bg-background/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      @click.self="showSetAlertModal = false"
    >
      <div class="bg-card border border-border rounded-3xl p-6 max-w-sm w-full shadow-2xl relative space-y-4">
        <button @click="showSetAlertModal = false" class="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-sm p-1 rounded-lg">✕</button>

        <h3 class="text-base font-bold text-foreground flex items-center gap-2">
          <span>🔔</span> Notifikasi Target Diskon Harga
        </h3>
        <p class="text-xs text-muted-foreground">
          Beri tahu saya ketika harga <span class="font-bold text-foreground">{{ dealForAlert.title }}</span> turun di bawah target!
        </p>

        <div class="bg-background border border-border rounded-xl p-3 space-y-1 text-xs font-mono">
          <div class="flex justify-between text-muted-foreground">
            <span>Harga Promo Saat Ini:</span>
            <span class="font-bold text-amber-400">{{ formatPrice(dealForAlert.salePrice) }}</span>
          </div>
          <div class="flex justify-between text-muted-foreground">
            <span>Harga Normal:</span>
            <span class="line-through text-rose-400">{{ formatPrice(dealForAlert.normalPrice) }}</span>
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-muted-foreground mb-1">Target Harga Maksimal ({{ selectedCurrency === 'IDR' ? 'Rp' : '$' }}):</label>
          <input 
            v-model.number="targetAlertPrice" 
            type="number" 
            :placeholder="selectedCurrency === 'IDR' ? 'Contoh: 150000' : 'Contoh: 10'" 
            class="w-full bg-background border border-border rounded-xl px-4 py-2 text-sm font-mono text-foreground focus:outline-none focus:border-primary"
            autofocus
          />
          <p class="text-[10px] text-muted-foreground mt-1">Notifikasi browser desktop akan muncul saat harga mencapai atau lebih murah dari target ini.</p>
        </div>

        <button @click="savePriceAlert" class="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl text-xs shadow-md transition-all">
          🔔 Simpan Target Notifikasi
        </button>
      </div>
    </div>

    <!-- Active Price Alerts Manager Drawer -->
    <div 
      v-if="showAlertsManagerModal" 
      class="fixed inset-0 z-50 bg-background/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      @click.self="showAlertsManagerModal = false"
    >
      <div class="bg-card border border-border rounded-3xl p-6 max-w-lg w-full shadow-2xl relative space-y-4">
        <button @click="showAlertsManagerModal = false" class="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-sm p-1 rounded-lg">✕</button>

        <div class="flex items-center justify-between pr-6">
          <h3 class="text-base font-bold text-foreground flex items-center gap-2">
            <span>🔔</span> Pengelola Notifikasi Target Diskon ({{ priceAlerts.length }})
          </h3>
          <button @click="requestNotificationPermission" class="text-[11px] font-semibold text-primary hover:underline">
            🔑 Izin Notifikasi Browser
          </button>
        </div>

        <div v-if="priceAlerts.length === 0" class="py-8 text-center text-muted-foreground text-xs">
          <span class="text-3xl block mb-2">🔔</span>
          Belum ada notifikasi target harga diset. Klik ikon 🔔 pada kartu game untuk memasang target!
        </div>

        <div v-else class="space-y-2.5 max-h-[50vh] overflow-y-auto pr-1">
          <div 
            v-for="alertItem in priceAlerts" 
            :key="alertItem.id"
            class="bg-background border border-border rounded-2xl p-3 flex items-center justify-between gap-3 text-xs"
          >
            <div class="truncate">
              <h4 class="font-bold text-foreground truncate">{{ alertItem.title }}</h4>
              <p class="text-[11px] font-mono text-muted-foreground">
                Target: <span class="text-emerald-400 font-bold">{{ alertItem.currency === 'IDR' ? `Rp ${alertItem.targetPrice.toLocaleString('id-ID')}` : `$${alertItem.targetPrice}` }}</span> (Store: {{ alertItem.storeName }})
              </p>
            </div>

            <div class="flex items-center gap-2 shrink-0">
              <button @click="removePriceAlert(alertItem.id)" class="p-1.5 text-muted-foreground hover:text-rose-400 hover:bg-rose-500/10 rounded-lg">
                ✕
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useToast } from '~/composables/useToast'

const { success } = useToast()

const stores = [
  { storeID: 'all', storeName: 'Semua Store', icon: '🛒' },
  { storeID: '1', storeName: 'Steam', icon: '🎮' },
  { storeID: '25', storeName: 'Epic Games', icon: '⚡' },
  { storeID: '11', storeName: 'Ubisoft', icon: '🛡️' },
  { storeID: 'eneba', storeName: 'Eneba Marketplace', icon: '🛍️' },
  { storeID: '7', storeName: 'GOG.com', icon: '📜' },
  { storeID: '15', storeName: 'Fanatical / Microsoft', icon: '🟩' }
]

const deals = ref<any[]>([])
const freebies = ref<any[]>([])
const loading = ref(true)
const selectedStoreID = ref('all')
const minDiscount = ref(0)
const searchQuery = ref('')
const showWishlistOnly = ref(false)
const wishlist = ref<any[]>([])

const selectedCurrency = ref<'IDR' | 'USD'>('IDR')
const USD_TO_IDR = 15800

interface GamePriceAlert {
  id: string
  title: string
  targetPrice: number
  currency: 'IDR' | 'USD'
  storeName: string
  dealLink: string
  createdAt: string
}

const priceAlerts = ref<GamePriceAlert[]>([])
const showSetAlertModal = ref(false)
const showAlertsManagerModal = ref(false)
const dealForAlert = ref<any>(null)
const targetAlertPrice = ref<number>(0)

function openSetAlertModal(deal: any) {
  dealForAlert.value = deal
  const priceNum = parseFloat(deal.salePrice.replace(/[^0-9.]/g, '')) || 10
  if (selectedCurrency.value === 'IDR') {
    targetAlertPrice.value = Math.round(priceNum * USD_TO_IDR)
  } else {
    targetAlertPrice.value = priceNum
  }
  showSetAlertModal.value = true
}

function savePriceAlert() {
  if (!dealForAlert.value || !targetAlertPrice.value) return
  
  const alertItem: GamePriceAlert = {
    id: `alert_${dealForAlert.value.id}_${Date.now()}`,
    title: dealForAlert.value.title,
    targetPrice: targetAlertPrice.value,
    currency: selectedCurrency.value,
    storeName: dealForAlert.value.storeName,
    dealLink: dealForAlert.value.dealLink,
    createdAt: new Date().toISOString()
  }

  priceAlerts.value.push(alertItem)
  savePriceAlerts()
  showSetAlertModal.value = false
  success(`Notifikasi target harga untuk "${dealForAlert.value.title}" berhasil dipasang!`)
  requestNotificationPermission()
}

function removePriceAlert(id: string) {
  priceAlerts.value = priceAlerts.value.filter(a => a.id !== id)
  savePriceAlerts()
  success('Target notifikasi diskon berhasil dihapus.')
}

function savePriceAlerts() {
  if (typeof window !== 'undefined') {
    localStorage.setItem('game_price_alerts', JSON.stringify(priceAlerts.value))
  }
}

function loadPriceAlerts() {
  if (typeof window !== 'undefined') {
    const raw = localStorage.getItem('game_price_alerts')
    if (raw) {
      try { priceAlerts.value = JSON.parse(raw) } catch {}
    }
  }
}

function requestNotificationPermission() {
  if (typeof window !== 'undefined' && 'Notification' in window) {
    if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      Notification.requestPermission()
    }
  }
}

function checkPriceAlerts(dealsList: any[]) {
  if (typeof window === 'undefined' || priceAlerts.value.length === 0) return

  priceAlerts.value.forEach(alertItem => {
    const matchedDeal = dealsList.find(d => d.title.toLowerCase().includes(alertItem.title.toLowerCase()))
    if (matchedDeal) {
      const currentUsd = parseFloat(matchedDeal.salePrice.replace(/[^0-9.]/g, '')) || 0
      const currentPriceInAlertCurrency = alertItem.currency === 'IDR' ? currentUsd * USD_TO_IDR : currentUsd

      if (currentPriceInAlertCurrency <= alertItem.targetPrice && currentPriceInAlertCurrency > 0) {
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification(`🎉 TARGET DISKON TERCAPAI: ${matchedDeal.title}!`, {
            body: `Harga turun menjadi ${formatPrice(matchedDeal.salePrice)} di ${matchedDeal.storeName}! Klik untuk klaim.`,
            icon: matchedDeal.thumb
          })
        }
      }
    }
  })
}

function formatPrice(priceStr: string | undefined): string {
  if (!priceStr) return 'GRATIS'
  if (priceStr.toUpperCase().includes('GRATIS') || priceStr.toUpperCase().includes('FREE') || priceStr === '$0' || priceStr === '$0.00') {
    return 'GRATIS'
  }

  const num = parseFloat(priceStr.replace(/[^0-9.]/g, ''))
  if (isNaN(num) || num === 0) return 'GRATIS'

  if (selectedCurrency.value === 'IDR') {
    const idr = Math.round(num * USD_TO_IDR)
    return `Rp ${idr.toLocaleString('id-ID')}`
  } else {
    return `$${num.toFixed(2)}`
  }
}

const displayedDeals = computed(() => {
  if (showWishlistOnly.value) {
    return wishlist.value
  }
  return deals.value
})

async function fetchDeals() {
  loading.value = true
  try {
    const api = useApi()
    const queryStr = `?storeID=${selectedStoreID.value}&title=${encodeURIComponent(searchQuery.value)}&minDiscount=${minDiscount.value}&sortBy=savings`
    const res = await api.get<{ success?: boolean; data?: any[] }>(`/games/deals${queryStr}`)
    if (res?.data) {
      deals.value = res.data
      checkPriceAlerts(res.data)
    }
  } catch (e: any) {
    console.error('Failed to load deals', e)
  } finally {
    loading.value = false
  }
}

async function fetchFreebies() {
  try {
    const api = useApi()
    const res = await api.get<{ success?: boolean; data?: any[] }>('/games/freebies')
    if (res?.data) {
      freebies.value = res.data
    }
  } catch (e: any) {
    console.error('Failed to load freebies', e)
  }
}

function selectStore(storeID: string) {
  selectedStoreID.value = storeID
  void fetchDeals()
}

function isWishlisted(dealID: string): boolean {
  return wishlist.value.some(w => w.id === dealID)
}

function toggleWishlist(deal: any) {
  if (isWishlisted(deal.id)) {
    wishlist.value = wishlist.value.filter(w => w.id !== deal.id)
    success(`"${deal.title}" dihapus dari Wishlist.`)
  } else {
    wishlist.value.push(deal)
    success(`"${deal.title}" disimpan ke Wishlist!`)
  }
  saveWishlist()
}

function saveWishlist() {
  if (typeof window !== 'undefined') {
    localStorage.setItem('game_deals_wishlist', JSON.stringify(wishlist.value))
  }
}

function loadWishlist() {
  if (typeof window !== 'undefined') {
    const raw = localStorage.getItem('game_deals_wishlist')
    if (raw) {
      try { wishlist.value = JSON.parse(raw) } catch {}
    }
  }
}

onMounted(() => {
  loadWishlist()
  loadPriceAlerts()
  void fetchFreebies()
  void fetchDeals()
})
</script>

<style scoped>
.spinner { border: 3px solid currentColor; border-right-color: transparent; border-radius: 50%; animation: spin .8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>
