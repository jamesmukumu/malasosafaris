// server/api/home.js

import { pool } from "../utils/pool"

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig(event)
    const { baseUrl } = config.public

    const response = await $fetch(`${baseUrl}/fetch/package/active`)
     var {rows} = await pool.query("SELECT * FROM blogs WHERE published = true ORDER BY created_at DESC  LIMIT 6")

    // console.log("SERVER RESPONSE:", response)

    return {
    "packages":response,
    "blogs":rows
    }
  } catch (err) {
    console.error("SERVER FETCH ERROR:", err)
    return { error: err }
  }
})