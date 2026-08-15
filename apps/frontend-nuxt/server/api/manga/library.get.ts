import { listLocalManga } from '../../utils/manga'

export default defineEventHandler(async () => {
  const mangaList = listLocalManga()
  return {
    success: true,
    data: mangaList
  }
})
