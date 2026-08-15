export default defineEventHandler(async (event) => {
  const sourceId = getRouterParam(event, 'source') || ''
  const slug = getRouterParam(event, 'slug') || ''

  if (sourceId === 'dreamy-translations') {
    return await scrapeDreamyNovelDetail(slug)
  } else if (sourceId === 'noveldex') {
    return await scrapeNoveldexNovelDetail(slug)
  }

  throw createError({ statusCode: 404, statusMessage: 'Novel detail scraper for this source is not supported' })
})
