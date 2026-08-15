export default defineEventHandler(async (event) => {
  const folderName = getRouterParam(event, 'folder') || ''
  const query = getQuery(event)
  const categoryId = typeof query.categoryId === 'string' ? query.categoryId : ''
  return await getVideosByFolder(categoryId, folderName)
})
