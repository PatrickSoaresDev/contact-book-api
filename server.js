require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const db = require('./src/models')

var corsOptions = {
  origin: '*',
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
require('./src/routes')(app)

db.sequelize
  .sync()
  .then(() => {
    console.log('MYSQL connect successfully')
  })
  .catch((err) => {
    console.log(`Failed to connect db: ${process.env.DB_NAME}` + err.message)
  })

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`🔥Server is up and running on port ${PORT}.🔥`)
})
