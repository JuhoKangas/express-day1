import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = pg

const pool = new Pool({
    user: process.env.DB_USER || 'todouser',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'tododb',
    password: process.env.DB_PASSWORD || 'todopassword',
    port: process.env.DB_PORT || 5432
})

pool.on('connect', () => {
    console.log('database connected succesfully')
})

pool.on('error', (err) => {
    console.log("Something went wrong with psql", err)
    process.exit(-1)
})

export default pool