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

    if (Array.isArray(res.data)) {
      const deals: GameDealItem[] = res.data.map((item: any) => {
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

      if (!options.title && (!options.storeID || options.storeID === 'all')) {
        cachedDeals = deals
        lastDealsFetchTime = now
      }

      return filterAndSortDeals(deals, options)
    }

    return []
  } catch (err: any) {
    console.error('[GameDeals Error] Failed to fetch CheapShark deals:', err.message)
    return cachedDeals.length > 0 ? filterAndSortDeals(cachedDeals, options) : []
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
