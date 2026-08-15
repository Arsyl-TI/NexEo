export default defineEventHandler(async (event) => {
  const sourceId = getRouterParam(event, 'source') || ''
  return await getSourceCatalog(sourceId)
})
