// server/api/home.js

import { pool } from "../utils/pool"

export default defineEventHandler(async (event) => {
  try {
  

   
    var {rows} = await pool.query("SELECT * FROM blogs WHERE published = true ORDER BY created_at DESC  LIMIT 6")
    let {rows:packages} = await pool.query("SELECT * FROM packages WHERE published = true ORDER BY created_at ASC LIMIT 6")
    // console.log("SERVER RESPONSE:", response)

    return {
    "packages":packages,
    "blogs":rows
    }
  } catch (err) {
    console.error("SERVER FETCH ERROR:", err)
    return { error: err }
  }
})