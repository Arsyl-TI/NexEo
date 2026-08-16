import axios from 'axios'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const dealID = query.dealID as string

  if (!dealID) {
    throw createError({ statusCode: 400, statusMessage: 'Parameter dealID diperlukan.' })
  }

  try {
    const res = await axios.get(`https://www.cheapshark.com/api/1.0/deals?id=${dealID}`, {
      timeout: 8000
    })

    return {
      success: true,
      data: res.data
    }
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: err.message })
  }
})
