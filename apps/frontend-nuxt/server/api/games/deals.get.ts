export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const storeID = query.storeID as string || 'all'
  const title = query.title as string || ''
  const sortBy = query.sortBy as string || 'Savings'
  const minDiscount = query.minDiscount ? parseInt(query.minDiscount as string, 10) : 0

  try {
    const deals = await fetchAllGameDeals({
      storeID,
      title,
      sortBy,
      lowerPrice: minDiscount
    })

    return {
      success: true,
      data: deals
    }
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: err.message })
  }
})
