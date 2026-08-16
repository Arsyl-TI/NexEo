export default defineEventHandler(async (event) => {
  const sourceId = getRouterParam(event, 'source') || ''
  const slug = getRouterParam(event, 'slug') || ''

  if (sourceId === 'sakuranovel') {
    return await scrapeSakuraNovelDetail(slug)
  } else if (sourceId === 'indowebnovel') {
    return await scrapeIndowebnovelDetail(slug)
  } else if (sourceId === 'meionovel') {
    return await scrapeMeionovelDetail(slug)
  } else if (sourceId === 'vanovel') {
    return await scrapeVanovelDetail(slug)
  } else if (sourceId === 'bacalightnovel') {
    return await scrapeBacalightnovelDetail(slug)
  } else if (sourceId === 'novelbookid') {
    return await scrapeNovelbookidDetail(slug)
  } else if (sourceId === 'dreamy-translations') {
    return await scrapeDreamyNovelDetail(slug)
  } else if (sourceId === 'noveldex') {
    return await scrapeNoveldexNovelDetail(slug)
  }

  throw createError({ statusCode: 404, statusMessage: 'Novel detail scraper for this source is not supported' })
})
