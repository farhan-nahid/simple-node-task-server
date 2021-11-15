const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// USE MIDDLEWARE

app.use(cors());
app.use(express.json());

// CONNECT WITH MONGODB

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.2xoju.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db(`${process.env.DB_NAME}`);
    const productCollection = database.collection('products');

    // POST API

    app.post('/add-products', async (req, res) => {
      const products = req.body;
      const results = await productCollection.insertOne(products);
      res.json(results);
    });

    // GET API

    app.get('/all-products', async (req, res) => {
      const cursor = await productCollection.find({});
      const products = await cursor.toArray();
      res.send(products);
    });

    // DELETE API

    app.delete('/product/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = productCollection.deleteOne(query);
      res.json(result);
    });
  } finally {
    // await client.close()
  }
}
run().catch(console.dir);

app.get('/', (req, res) => res.send('Welcome to Simple Node Task Server'));
app.listen(port, () => console.log(`Server Running on localhost:${port}`));
