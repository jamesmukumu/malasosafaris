export default eventHandler(async(event)=>{
try{
let {rows} = await pool.query(
`
SELECT a.*,COUNT(x.id) AS adventures_count FROM adventures_categories a
LEFT JOIN adventures x ON adventures_category_id = a.id
GROUP BY a.id
ORDER BY a.created_at DESC
`
)

return {
rows
}
}catch(err){
console.error(err)
return err
}

})