export default eventHandler(async(event)=>{
try{
let {slug} = getQuery(event)
let {rows} = await pool.query(`
SELECT * FROM adventures WHERE slug = $1 AND
published = true
`,[slug])

return {rows}
}catch(err){
console.error(err)
return err
}
})