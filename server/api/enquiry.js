export default eventHandler(async(event)=>{
try{
let body = await readBody(event)
let {rows} = await pool.query(
"INSERT INTO enquiries (first_name,last_name,email,contact_preference,phone_number,nationality,enquiry_description,created_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
[
body.firstName,
body.lastName,
body.email,
"email",
body.phone,
body.Nationality,
body.message,
new Date()
]
)

return rows
}catch(err){
console.error(err)
return err
}

})