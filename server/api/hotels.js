import { pool } from "../utils/pool"


export default eventHandler(async (event)=>{
let {rows} = await pool.query("SELECT * FROM hotels WHERE ratings > 4 AND published = true")
return rows
})