export default eventHandler(async(event)=>{
try{

let [{rows:destinations},{rows:hotels},{rows:blogs},{rows:attractions},{rows:adventures},{rows:experiences},{rows:package_categories},{rows:packages}] = await Promise.all([
pool.query("SELECT destination_slug,updated_at,destination_photo FROM destinations"),
pool.query("SELECT slug,updated_at,hotel_thumbnail FROM hotels"),
pool.query("SELECT slug,updated_at,blog_photo FROM blogs"),
pool.query("SELECT attraction_slug,updated_at,attraction_photo FROM attractions"),
pool.query("SELECT adventure_slug,updated_at FROM adventures_categories"),
pool.query("SELECT slug,updated_at,adventure_photo FROM adventures"),
pool.query("SELECT package_category_name,package_category_image,updated_at FROM package_categories"),
pool.query("SELECT package_photo,updated_at,package_slug FROM packages")

]) 

let destination_urls = destinations.map((destination)=>({
loc:`/destination/${destination.destination_slug}`,
lastmod:destination.updated_at,
changefreq:'weekly',
priority:0.9 ,
images:[
{
loc:destination.destination_photo,
caption:destination.destination_slug,
title:destination.destination_slug
}
] 
    
}))


// hotels
let hotels_urls = hotels.map((hotel)=>({
loc:`/hotel/${hotel.slug}`,
lastmod:hotel.updated_at,
changefreq:'weekly',
priority:0.9,
images:[
{
loc:hotel.hotel_thumbnail,
caption:hotel.hotel_slug,
title:hotel.hotel_slug
}
]
    
}))


// blogs
let blogs_urls = blogs.map((blog)=>({
loc:`/blog/${blog.slug}`,
lastmod:blog.updated_at,
changefreq:'weekly',
priority:0.9,
images:[
{
loc:blog.blog_photo,
title:blog.slug,
caption:blog.slug
}
]
    
}))


// attractions

let attraction_urls = attractions.map((attraction)=>({
loc:`/attraction/${attraction.attraction_slug}`,
lastmod:attraction.updated_at,
changefreq:'weekly',
priority:0.9,
images:[
{
loc:attraction.attraction_photo,
caption:attraction.attraction_slug,
title:attraction.attraction_slug
}
]
    
}))

// adventures
let adventure_urls = adventures.map((adventure)=>({
loc:`/adventure/category/${adventure.adventure_slug}`,
lastmod:adventure.updated_at,
changefreq:'weekly',
priority:0.9  
    
}))


// experiences
let experiences_urls = experiences.map((experience)=>({
loc:`/experience/${experience.slug}`,
lastmod:experience.updated_at,
changefreq:'weekly',
priority:0.9,
images:[
{
title:experience.slug,
caption:experience.slug,
loc:experience.adventure_photo
}
]
    
}))


//package_categories
let package_category_urls = package_categories.map((pck_category)=>({
loc:`/package/category/${pck_category.package_category_name.trim().replace(/\s+/g, '-')}`,
lastmod:pck_category.updated_at,
changefreq:'weekly',
priority:0.9,
images:[
{
title:pck_category.package_category_name,
caption:pck_category.package_category_name,
loc:pck_category.package_category_image
}
]
    
}))


//packages here
let package_urls = packages.map((pck)=>({
loc:`/tour/${pck.package_slug}`,
lastmod:pck.updated_at,
changefreq:'weekly',
priority:0.9,
images:[
{
title:pck.package_slug,
caption:pck.package_slug,
loc:pck.package_photo
}
]
    
}))


return [...package_urls,...destination_urls,...hotels_urls,...blogs_urls,...attraction_urls,...adventure_urls,...experiences_urls,...package_category_urls] 
}catch(err){
console.error(err)
return err
}

}) 