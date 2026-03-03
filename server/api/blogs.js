export default eventHandler(async(event)=>{
let query = getQuery(event)
let page = Math.max(Number(query.page) || 1,1)
let limit = 3
let offset = (page - 1) * limit
let {rows} = await pool.query(`SELECT * FROM blogs WHERE published = true ORDER BY created_at DESC LIMIT $1 OFFSET $2`,[limit,offset])
let {rows:count} = await pool.query("SELECT COUNT (*) FROM blogs WHERE published = true")

return {
"count":Number(count[0].count),
"rows":rows
}
})