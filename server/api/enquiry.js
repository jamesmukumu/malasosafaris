export default eventHandler(async(event)=>{
try{
let body = await readBody(event)
let {rows} = await pool.query(
"INSERT INTO enquiries (first_name,last_name,email,contact_preference,phone_number,nationality,enquiry_description,created_at,adults_count,children_count,start_stay_date,end_stay_date) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *",
[
body.firstName,
body.lastName,
body.email,
"email",
body.phone,
body.Nationality,
body.message,
new Date(),
body.adults_count,
body.children_count,
body.start_stay_date,
body.end_stay_date
]
)

return {
success:true
}
}catch(err){
console.error(err)
return err
}

})