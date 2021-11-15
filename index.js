const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// USE MIDDLEWARE

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Welcome to Simple Node Task Server'));
app.listen(port, () => console.log(`Server Running on localhost:${port}`));
