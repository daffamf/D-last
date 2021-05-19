const { Pool } = require('pg')

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: '12345',
  database: 'last_hour_food_sale',
  port: 5432,
})

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
// })

module.exports = pool