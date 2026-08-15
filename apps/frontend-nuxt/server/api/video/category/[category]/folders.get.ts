export default defineEventHandler(async (event) => {
  const categoryId = getRouterParam(event, 'category') || ''
  return await getFoldersByCategory(categoryId)
})
