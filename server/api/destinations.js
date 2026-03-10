export default eventHandler(async (event) => {
  const query = getQuery(event)

  const page = Math.max(Number(query.page) || 1, 1)
  const limit = 6
  const offset = (page - 1) * limit

  // Main query (with packages count)
  const { rows } = await pool.query(
    `SELECT 
        d.*,
        COUNT(p.id) AS packages_count
     FROM destinations d
     LEFT JOIN packages p 
        ON p.destination_id = d.id
     WHERE d.published = true
     GROUP BY d.id
     ORDER BY d.created_at ASC
     LIMIT $1 OFFSET $2`,
    [limit, offset]
  )

  // Total count (for pagination)
  const { rows: count } = await pool.query(
    `SELECT COUNT(*) 
     FROM destinations 
     WHERE published = true`
  )

  return {
    count: Number(count[0].count),
    rows
  }
})