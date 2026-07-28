export default eventHandler(async(event)=>{
try{
let body = await readBody(event)
let {rows} = await pool.query(
"INSERT INTO bulk_mails (email) VALUES ($1) RETURNING *",[body.email]
)
return {
success:true
}
}catch(err){
console.error(err)
return {
success:false
}
}

})