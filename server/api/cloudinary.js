import {v2 as cloudinary} from "cloudinary"
export default defineEventHandler(async(event)=>{
cloudinary.config({
  cloud_name: 'dasrniwpk',
  api_key: '127522832224378',
  api_secret: '60rb1fOK-JsS_On5ae8iSybJx6A'
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