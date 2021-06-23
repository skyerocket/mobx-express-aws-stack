const serverless = require('serverless-http');
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
app.use(cors())

const axios = require('axios');
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4ODY0OGVkNy01OGQxLTQzZjQtYmEyNi02ZWE0YzljYThmNWYiLCJpZCI6NTk1NzEsImlhdCI6MTYyNDQ3Njk3OX0.QNF3DIMw-WSztBH1FKUh1Elyt-lYD-61UxzWdfEz7Qo'
axios.defaults.headers.common = {'Authorization': `bearer ${token}`}

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'postgresdb.cjgnjmqdsaur.ap-southeast-2.rds.amazonaws.com',
  database: 'postgres',
  password: 'test1234567',
  port: '5432'
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