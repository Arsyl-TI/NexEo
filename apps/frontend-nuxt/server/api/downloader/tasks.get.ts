export default defineEventHandler(() => {
  const tasks = getDownloadTasks()
  return { success: true, data: tasks }
})
