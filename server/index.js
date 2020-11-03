const keys = require('./keys');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const { Pool } = require('pg');
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort,
});

pgClient.on('connect', () => {
  pgClient
    .query('CREATE TABLE IF NOT EXISTS values (val TEXT)')
    .catch((err) => console.log(err));
});

app.get('/', (req, res) => {
  res.send('Hola X');
});

app.get('/values', async (req, res) => {
  const values = await pgClient.query('SELECT * from values');
  res.send(values.rows);
});

app.post('/values', async (req, res) => {
  const value = req.body.value;
  await pgClient.query('INSERT INTO values(val) VALUES($1)', [value]);
  res.send({ val: value });
});

app.listen(5000, (err) => {
  console.log('Listening');
});