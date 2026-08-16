export default defineEventHandler(async () => {
  try {
    const epicFreebies = await fetchEpicFreebies()
    const cheapSharkDeals = await fetchAllGameDeals({ onSaleOnly: true })
    const cheapSharkFreebies = cheapSharkDeals.filter(d => d.isFreebie)

    // Combine and deduplicate
    const combined = [...epicFreebies]
    cheapSharkFreebies.forEach(csItem => {
      if (!combined.some(item => item.title.toLowerCase() === csItem.title.toLowerCase())) {
        combined.push(csItem)
      }
    })

    return {
      success: true,
      data: combined
    }
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: err.message })
  }
})
