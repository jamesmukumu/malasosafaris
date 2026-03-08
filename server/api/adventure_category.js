export default eventHandler(async(event)=>{
try{
let {slug} = getQuery(event)
let { rows } = await pool.query(
`
SELECT 
    ac.*,
    COALESCE(a.adventures, '[]') AS adventures

FROM adventures_categories ac

-- Get adventures belonging to this category
LEFT JOIN LATERAL (
    SELECT json_agg(adventure_data) AS adventures
    FROM (
        SELECT *
        FROM adventures adv
        WHERE adv.adventures_category_id = ac.id
          AND adv.published = true
        LIMIT 6
    ) adventure_data
) a ON true

WHERE ac.adventure_slug = $1;
`,
[slug]
);
return {
rows
}
}catch(err){
console.error(err)
return err
}


})