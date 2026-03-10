export default eventHandler(async(event)=>{
try{
let {slug} = getQuery(event)
let { rows } = await pool.query(
`
SELECT 
  p.*,
  to_json(pc.*) AS package_category,
  (
    SELECT json_agg(rp ORDER BY rp.created_at ASC)
    FROM packages rp
    WHERE rp.package_category_id = p.package_category_id
      AND rp.package_slug != p.package_slug
      AND rp.published = true
    LIMIT 6
  ) AS related_packages
FROM packages p
JOIN package_categories pc ON p.package_category_id = pc.id
WHERE p.package_slug = $1
  AND p.published = true
`,
[slug]
)
return {
rows
}
}catch(err){
console.log(err)
return err
}
})