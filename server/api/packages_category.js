export default eventHandler(async(event)=>{
try{
let {rows} = await pool.query(
`
SELECT a.*,COUNT(x.id) AS packages_count FROM package_categories a
LEFT JOIN packages x ON package_category_id = a.id
GROUP BY a.id
ORDER BY a.created_at ASC
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