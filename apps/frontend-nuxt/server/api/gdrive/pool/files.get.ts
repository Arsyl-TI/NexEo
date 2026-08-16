export default defineEventHandler(async () => {
  const files = loadPooledFiles()
  return {
    success: true,
    data: files
  }
})
