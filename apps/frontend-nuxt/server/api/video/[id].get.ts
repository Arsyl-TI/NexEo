export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Video ID required' })
  }
  const video = await getVideoById(id)
  if (!video) {
    throw createError({ statusCode: 404, statusMessage: 'Video not found' })
  }
  return video
})
