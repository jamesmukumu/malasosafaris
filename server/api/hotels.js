import { pool } from "../utils/pool"


export default eventHandler(async (event)=>{
try{
let query = getQuery(event)
let page = Math.max(Number(query.page) || 1 , 1)
let limit = 6
let offset = (page - 1) * limit

let {rows} = await pool.query("SELECT * FROM hotels WHERE published = true ORDER BY created_at DESC LIMIT 6 OFFSET $1",[offset])
let {rows:count} = await pool.query("SELECT COUNT (*) FROM hotels WHERE published = true")

return {
"hotels":rows,
"count":Number(count[0].count)
}

}catch(err){
console.error(err)
return err

}
})