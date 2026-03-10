export default eventHandler(async(event)=>{
try{
let {slug} = getQuery(event)
let modifiedSlug = slug.replace(/-/g, ' ')
let { rows } = await pool.query(
`
SELECT 
    pc.*,
    COALESCE(pck.packages, '[]') AS packages

FROM package_categories pc

-- Get respective packages belonging to this category
LEFT JOIN LATERAL (
    SELECT json_agg(package_data) AS packages
    FROM (
        SELECT *
        FROM packages pck
        WHERE pck.package_category_id = pc.id
          AND pck.published = true
        
    ) package_data
) pck ON true

WHERE pc.package_category_name = $1;
`,
[modifiedSlug]
);
return {
rows
}
}catch(err){
console.error(err)
return err
}


})