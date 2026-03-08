export default eventHandler(async (event) => {
  try {
    const query = getQuery(event)

    const page = Math.max(query.page || 1, 1)
    const limit = 6
    const offset = (page - 1) * limit

    const { rows } = await pool.query(
      `
      SELECT 
        attractions.*,
        destinations.* AS destination
      FROM attractions
      JOIN destinations 
        ON attractions.destination_id = destinations.id
      WHERE attractions.published = true
      LIMIT $1 OFFSET $2
      `,
      [limit, offset]
    )

    const countResult = await pool.query(
      `SELECT COUNT(*) FROM attractions WHERE published = true`
    )

    return {
      rows,
      count: parseInt(countResult.rows[0].count)
    }

  } catch (err) {
    console.error(err)
    return err
  }
})