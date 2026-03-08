export default eventHandler(async(event)=>{
try{
let {slug} = getQuery(event)

let { rows } = await pool.query(
`
SELECT 
  a.*,

  COALESCE(
    json_agg(DISTINCT p) FILTER (WHERE p.id IS NOT NULL),
    '[]'
  ) AS packages,

  COALESCE(
    json_agg(DISTINCT h) FILTER (WHERE h.id IS NOT NULL),
    '[]'
  ) AS hotels

FROM attractions a

LEFT JOIN LATERAL (
  SELECT *
  FROM packages
  WHERE destination_id = a.destination_id
    AND published = true
  LIMIT 6
) p ON true

LEFT JOIN LATERAL (
  SELECT *
  FROM hotels
  WHERE destination_id = a.destination_id
    AND published = true
  LIMIT 3
) h ON true

WHERE a.attraction_slug = $1
  AND a.published = true

GROUP BY a.id
`,
[slug]
)
return rows[0]
}catch(err){
console.error(err)
return err
}



})