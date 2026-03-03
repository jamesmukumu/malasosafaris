import {Pool} from "pg"
let config = useRuntimeConfig()
export let pool = new Pool({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    ssl:{
    rejectUnauthorized:false
    }
  })
