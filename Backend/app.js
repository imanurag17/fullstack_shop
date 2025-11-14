const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const authRouter = require('./routes/auth')
const prodRouter = require('./routes/prod')

const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

app.use('/auth',authRouter)
app.use(prodRouter)

mongoose.connect(
  'mongodb+srv://anurag17:xyzxyz%40123@cluster0.ta7afh4.mongodb.net/shoppingApp?retryWrites=true&w=majority&appName=Cluster0'
).then(result => {
  console.log('connected')
  app.listen(4000)
}).catch(error => {
  console.log(error)
})
