import {Pool} from "pg"

export default eventHandler(async (event)=>{
let config = useRuntimeConfig()
let pool = new Pool({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    ssl:{
    rejectUnauthorized:false
    }
  })

let {rows} = await pool.query("SELECT * FROM hotels WHERE ratings > 4 AND published = true")

return rows
})