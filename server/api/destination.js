export default eventHandler(async(event)=>{
try{
let {slug} = getQuery(event)
let {rows} = await pool.query(`SELECT 
    d.*,
    COALESCE(h.hotels, '[]') AS hotels,
    COALESCE(p.packages, '[]') AS packages
FROM destinations d

-- Get 5 hotels
LEFT JOIN LATERAL (
    SELECT json_agg(hotel_data) AS hotels
    FROM (
        SELECT *
        FROM hotels
        WHERE hotels.destination_id = d.id
          AND hotels.published = true
        ORDER BY hotels.created_at ASC
        LIMIT 3
    ) hotel_data
) h ON true

-- Get 6 packages
LEFT JOIN LATERAL (
    SELECT json_agg(package_data) AS packages
    FROM (
        SELECT *
        FROM packages
        WHERE packages.destination_id = d.id
          AND packages.published = true
        LIMIT 6
    ) package_data
) p ON true

WHERE d.destination_slug = $1
AND d.published = true;`,[slug])
return rows
}catch(err){
console.error(err)
return err
}

})