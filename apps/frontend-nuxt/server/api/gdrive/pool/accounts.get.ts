export default defineEventHandler(async () => {
  try {
    const accounts = await syncAllAccountsQuota()
    const totalBytes = accounts.reduce((acc, a) => acc + a.quotaBytesTotal, 0)
    const usedBytes = accounts.reduce((acc, a) => acc + a.quotaBytesUsed, 0)
    const freeBytes = Math.max(0, totalBytes - usedBytes)

    return {
      success: true,
      data: {
        accounts,
        totalBytes,
        usedBytes,
        freeBytes,
        totalBytesFormatted: formatBytes(totalBytes),
        usedBytesFormatted: formatBytes(usedBytes),
        freeBytesFormatted: formatBytes(freeBytes)
      }
    }
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: err.message })
  }
})
