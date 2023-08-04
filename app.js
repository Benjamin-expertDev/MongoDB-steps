const express = require('express');
const { connectToDb, getDb } = require('./db');

const app = express();

let db;

connectToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log("app listening to localhost 3000");
    });
    db = getDb();
  }
});

app.get('/new', (req, res) => {
  let sales = [];

  db.collection('sales')
    .find()
    .sort({ Client: 1 })
    .toArray() // Use toArray() instead of forEach()
    .then((salesArray) => {
      sales = salesArray;
      res.status(200).json(sales);
    })
    .catch(() => {
      res.status(500).json({ error: 'try some other code' });
    });
});
