require('dotenv').config()
const serverless = require('serverless-http');
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
app.use(cors())

const axios = require('axios');
const token = process.env.API_TOKEN
axios.defaults.headers.common = {'Authorization': `bearer ${token}`}

const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
})

const getAllAccounts = (request, response) => {
  pool.query('SELECT * FROM accounts;', (error, results) => {
    if (error) {
      response.status(500).json({
        "Error": error
      })
    }
    response.status(200).json(results.rows)
  })
}

app.get('/', (req, res) => {
    axios.get('https://api.cesium.com/v1/assets')
        .then(response => {
          res.send(response.data)
        })
        .catch(err => {
            console.log('api call failed', err)
        })
})

app.get('/db', getAllAccounts)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports.handler = serverless(app);