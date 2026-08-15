export default defineEventHandler(() => {
  const novels = listLocalNovels()
  return { success: true, data: novels }
})
