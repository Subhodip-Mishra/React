
const doteenv = require('dotenv')
doteenv.config()
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser')
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'passop';
const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')

app.use(bodyParser.json())
app.use(cors())

console.log(process.env.MONGODB_URI)

client.connect();

// get all passwords]

app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})
// save password
app.post('/', async (req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.insertOne(password)
  res.json({success: true, result: findResult})
})
// delete passowrd
app.delete('/', async (req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.deleteOne(password)
  res.json({success: true, result: findResult})
})

app.listen(port, () => {
  console.log(`Example app listenindg on port http://localhost:${port}`)
})