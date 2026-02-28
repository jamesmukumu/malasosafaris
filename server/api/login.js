export default defineEventHandler(async(event)=>{
try{
    console.log("Response here")
let configs = useRuntimeConfig(event)
var {baseUrl} = configs.public
//i want to pass a payload here to the request
let Body = await readBody(event)

let response = await $fetch(`${baseUrl}/login/user`,{
method:"POST",
body:Body
}) 
return response
}catch(err){
return err
     
}

})