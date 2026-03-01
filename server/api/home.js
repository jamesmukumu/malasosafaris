// server/api/home.js

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig(event)
    const { baseUrl } = config.public

    const response = await $fetch(`${baseUrl}/fetch/package/active`)

    // console.log("SERVER RESPONSE:", response)

    return response
  } catch (err) {
    console.error("SERVER FETCH ERROR:", err)
    return { error: "Failed to fetch packages" }
  }
})