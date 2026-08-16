export default defineEventHandler(async () => {
  const stores = [
    { storeID: 'all', storeName: 'Semua Store', icon: '🛒' },
    { storeID: '1', storeName: 'Steam Store', icon: '🎮' },
    { storeID: '25', storeName: 'Epic Games Store', icon: '⚡' },
    { storeID: '11', storeName: 'Ubisoft Store', icon: '🛡️' },
    { storeID: 'eneba', storeName: 'Eneba Marketplace', icon: '🛍️' },
    { storeID: '7', storeName: 'GOG.com', icon: '📜' },
    { storeID: '15', storeName: 'Fanatical / Microsoft', icon: '🟩' },
    { storeID: '3', storeName: 'GreenManGaming', icon: '🟢' },
    { storeID: '8', storeName: 'EA Origin', icon: '🔴' }
  ]

  return {
    success: true,
    data: stores
  }
})
