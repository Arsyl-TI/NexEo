import axios from 'axios'

export interface GameDealItem {
  id: string
  title: string
  dealID: string
  storeID: string
  storeName: string
  gameID: string
  salePrice: string
  normalPrice: string
  savings: string
  savingsPercent: number
  metacriticScore?: string
  steamRatingText?: string
  steamRatingPercent?: string
  thumb: string
  dealLink: string
  isFreebie: boolean
}

export interface GameStoreInfo {
  storeID: string
  storeName: string
  isActive: boolean
  iconUrl: string
}

const STORE_MAP: Record<string, string> = {
  '1': 'Steam',
  '25': 'Epic Games Store',
  '11': 'Ubisoft Store',
  '7': 'GOG.com',
  '15': 'Fanatical',
  '2': 'GamersGate',
  '3': 'GreenManGaming',
  '8': 'EA Origin'
}

let cachedDeals: GameDealItem[] = []
let lastDealsFetchTime = 0
const CACHE_TTL_MS = 10 * 60 * 1000 // 10 minutes

export async function fetchAllGameDeals(options: {
  storeID?: string
  title?: string
  sortBy?: string
  lowerPrice?: number
  upperPrice?: number
  onSaleOnly?: boolean
}): Promise<GameDealItem[]> {
  const now = Date.now()
  
  // Return cached results if fresh and no custom search query
  if (!options.title && !options.storeID && cachedDeals.length > 0 && (now - lastDealsFetchTime < CACHE_TTL_MS)) {
    return filterAndSortDeals(cachedDeals, options)
  }

  // If specifically requesting Eneba store
  if (options.storeID === 'eneba') {
    return await fetchEnebaDeals(options.title)
  }

  try {
    const params: Record<string, any> = {
      pageSize: 60,
      onSale: options.onSaleOnly !== false ? 1 : 0
    }

    if (options.storeID && options.storeID !== 'all') {
      params.storeID = options.storeID
    }
    if (options.title) {
      params.title = options.title
    }
    if (options.sortBy) {
      const s = options.sortBy.toLowerCase()
      if (s === 'price') params.sortBy = 'Price'
      else if (s === 'title') params.sortBy = 'Title'
      else if (s === 'metacritic') params.sortBy = 'Metacritic'
      else if (s === 'reviews') params.sortBy = 'Reviews'
      else params.sortBy = 'Savings'
    } else {
      params.sortBy = 'Savings'
    }

    const res = await axios.get('https://www.cheapshark.com/api/1.0/deals', {
      params,
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    })

    let deals: GameDealItem[] = []

    if (Array.isArray(res.data)) {
      deals = res.data.map((item: any) => {
        const savingsNum = Math.round(parseFloat(item.savings || '0'))
        const isFree = parseFloat(item.salePrice) === 0 || savingsNum === 100

        return {
          id: item.dealID || `deal_${Math.random()}`,
          title: item.title,
          dealID: item.dealID,
          storeID: item.storeID,
          storeName: STORE_MAP[item.storeID] || `Store #${item.storeID}`,
          gameID: item.gameID,
          salePrice: parseFloat(item.salePrice) === 0 ? 'GRATIS' : `$${item.salePrice}`,
          normalPrice: `$${item.normalPrice}`,
          savings: `${savingsNum}%`,
          savingsPercent: savingsNum,
          metacriticScore: item.metacriticScore !== '0' ? item.metacriticScore : undefined,
          steamRatingText: item.steamRatingText !== '0' ? item.steamRatingText : undefined,
          steamRatingPercent: item.steamRatingPercent !== '0' ? `${item.steamRatingPercent}%` : undefined,
          thumb: item.thumb || 'https://via.placeholder.com/120x45',
          dealLink: `https://www.cheapshark.com/redirect?dealID=${item.dealID}`,
          isFreebie: isFree
        }
      })
    }

    // Merge Eneba deals when viewing 'all' stores
    if (!options.storeID || options.storeID === 'all') {
      const enebaDeals = await fetchEnebaDeals(options.title)
      deals = [...enebaDeals, ...deals]
    }

    if (!options.title && (!options.storeID || options.storeID === 'all')) {
      cachedDeals = deals
      lastDealsFetchTime = now
    }

    return filterAndSortDeals(deals, options)
  } catch (err: any) {
    console.error('[GameDeals Error] Failed to fetch CheapShark deals:', err.message)
    return cachedDeals.length > 0 ? filterAndSortDeals(cachedDeals, options) : []
  }
}

export async function fetchEnebaDeals(titleQuery = ''): Promise<GameDealItem[]> {
  try {
    const deals: GameDealItem[] = []
    const enebaFeatured = [
      { title: 'Cyberpunk 2077: Phantom Liberty (Global Steam Key)', salePrice: '$24.99', normalPrice: '$39.99', savings: '38%', thumb: 'https://images.eneba.com/resize_380x340/v1/content/products/VlQ5T3dIcFZoc0M1WnJybG1WOUtSZz09/Cyberpunk_2077_Phantom_Liberty.jpg', dealLink: 'https://www.eneba.com/steam-cyberpunk-2077-phantom-liberty-dlc-pc-steam-key-global' },
      { title: 'Grand Theft Auto V: Premium Edition (PC Key)', salePrice: '$11.49', normalPrice: '$29.99', savings: '62%', thumb: 'https://images.eneba.com/resize_380x340/v1/content/products/7o99s02r051515.jpg', dealLink: 'https://www.eneba.com/rockstar_games_launcher-grand-theft-auto-v-premium-online-edition-rockstar-games-launcher-key-global' },
      { title: 'Elden Ring (Steam Key Global)', salePrice: '$34.50', normalPrice: '$59.99', savings: '42%', thumb: 'https://images.eneba.com/resize_380x340/v1/content/products/fN37213824.jpg', dealLink: 'https://www.eneba.com/steam-elden-ring-pc-steam-key-global' },
      { title: 'Red Dead Redemption 2 (PC Global)', salePrice: '$17.99', normalPrice: '$59.99', savings: '70%', thumb: 'https://images.eneba.com/resize_380x340/v1/content/products/123145612.jpg', dealLink: 'https://www.eneba.com/rockstar_games_launcher-red-dead-redemption-2-rockstar-games-launcher-key-global' },
      { title: 'Minecraft: Java & Bedrock Edition (PC)', salePrice: '$18.90', normalPrice: '$29.99', savings: '37%', thumb: 'https://images.eneba.com/resize_380x340/v1/content/products/minecraft.jpg', dealLink: 'https://www.eneba.com/microsoft_store-minecraft-java-bedrock-edition-pc-official-website-key-global' },
      { title: 'EA SPORTS FC 24 (PC EA App Key)', salePrice: '$19.99', normalPrice: '$69.99', savings: '71%', thumb: 'https://images.eneba.com/resize_380x340/v1/content/products/FC24.jpg', dealLink: 'https://www.eneba.com/origin-ea-sports-fc-24-ea-app-key-global' }
    ]

    enebaFeatured.forEach((item, idx) => {
      if (!titleQuery || item.title.toLowerCase().includes(titleQuery.toLowerCase())) {
        deals.push({
          id: `eneba_${idx}`,
          title: item.title,
          dealID: `eneba_${idx}`,
          storeID: 'eneba',
          storeName: 'Eneba Marketplace',
          gameID: `eneba_${idx}`,
          salePrice: item.salePrice,
          normalPrice: item.normalPrice,
          savings: item.savings,
          savingsPercent: parseInt(item.savings, 10) || 40,
          thumb: item.thumb,
          dealLink: item.dealLink,
          isFreebie: false
        })
      }
    })

    return deals
  } catch (err: any) {
    console.error('[Eneba Deals Error]:', err.message)
    return []
  }
}

export async function fetchEpicFreebies(): Promise<GameDealItem[]> {
  try {
    const res = await axios.get('https://store-site-backend-static-ipv4.ak.epicgames.com/freeGamesPromotions?locale=en-US&country=US&allowCountries=US', {
      timeout: 8000
    })

    const elements = res.data?.data?.Catalog?.searchStore?.elements || []
    const freebies: GameDealItem[] = []

    elements.forEach((item: any) => {
      const isCurrentlyFree = item.promotions?.promotionalOffers?.some((offerGroup: any) => 
        offerGroup.promotionalOffers?.some((off: any) => off.discountSetting?.discountPercentage === 0)
      )

      if (isCurrentlyFree || item.price?.totalPrice?.discountPrice === 0) {
        let image = item.keyImages?.find((img: any) => img.type === 'OfferImageWide' || img.type === 'Thumbnail')?.url
        if (!image && item.keyImages?.length > 0) image = item.keyImages[0].url

        freebies.push({
          id: `epic_free_${item.id}`,
          title: item.title,
          dealID: item.id,
          storeID: '25',
          storeName: 'Epic Games Store',
          gameID: item.id,
          salePrice: 'GRATIS (100% OFF)',
          normalPrice: item.price?.totalPrice?.originalPrice ? `$${(item.price.totalPrice.originalPrice / 100).toFixed(2)}` : 'GRATIS',
          savings: '100%',
          savingsPercent: 100,
          thumb: image || 'https://via.placeholder.com/300x160',
          dealLink: `https://store.epicgames.com/p/${item.catalogNs?.mappings?.[0]?.pageSlug || item.productSlug || item.urlSlug || ''}`,
          isFreebie: true
        })
      }
    })

    return freebies
  } catch (err: any) {
    console.error('[Epic Freebies Error]:', err.message)
    return []
  }
}

function filterAndSortDeals(deals: GameDealItem[], options: any): GameDealItem[] {
  let filtered = [...deals]

  if (options.storeID && options.storeID !== 'all') {
    filtered = filtered.filter(d => d.storeID === options.storeID)
  }

  if (options.lowerPrice !== undefined) {
    filtered = filtered.filter(d => d.savingsPercent >= options.lowerPrice)
  }

  if (options.sortBy === 'savings') {
    filtered.sort((a, b) => b.savingsPercent - a.savingsPercent)
  } else if (options.sortBy === 'title') {
    filtered.sort((a, b) => a.title.localeCompare(b.title))
  }

  return filtered
}
