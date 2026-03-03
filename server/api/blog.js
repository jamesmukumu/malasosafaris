export default eventHandler(async(event)=>{
try{
let {slug} = getQuery(event)
let {rows:blog} = await pool.query(`SELECT * FROM  blogs WHERE published = true AND slug = $1`,[slug])

let {rows:relatedBlogs} = await pool.query(`SELECT * FROM blogs WHERE published = true AND blogs_category_id = $1 AND id != $2 LIMIT 3`,[blog[0].blogs_category_id,blog[0].id])
return {
"blog":blog,
"related_blogs":relatedBlogs
}
}catch(err){
console.error(err)
return err
}


})