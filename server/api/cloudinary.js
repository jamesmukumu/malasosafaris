import {v2 as cloudinary} from "cloudinary"
export default defineEventHandler(async(event)=>{
let config = useRuntimeConfig()
cloudinary.config({
  cloud_name: config.cld.name,
  api_key: config.cld.api_key,
  api_secret: config.cld.api_secret
})
try{
let results = await cloudinary.api.resources({
type:"upload",
prefix:"gallery",
resource_type:"image"
})
return {
"images":results.resources
}
}catch(err){
console.error(err)
return err
}




})