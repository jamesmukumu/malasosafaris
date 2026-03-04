export default eventHandler(async (event) => {
  try {
    let { slug } = getQuery(event);

    //this hotels has a column name destinations_id
    //modify the query and perform sort of a join on table name packages
    //to fetch packages with the same destinations_id and published
    //limit the packages to 6
    let { rows } = await pool.query(
      `  SELECT 
        h.*,
        COALESCE(
          json_agg(p) FILTER (WHERE p.id IS NOT NULL),
          '[]'
        ) AS packages
      FROM hotels h
      LEFT JOIN LATERAL (
        SELECT *
        FROM packages
        WHERE destination_id = h.destination_id
          AND published = true
        LIMIT 6
      ) p ON true
      WHERE h.slug = $1
        AND h.published = true
      GROUP BY h.id`,
      [slug],
    );
return rows
  } catch (err) {
    console.error(err)
    return err
  }
});
