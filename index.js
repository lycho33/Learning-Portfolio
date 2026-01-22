const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    console.log('🫣 Hello Docker! 🌸')
    res.send('🫥 Hello, Docker!');
});

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});

const pg = require('knex')({
  client: 'pg',
  connection: {
    host:     process.env.DB_HOST,     
    user:     process.env.DB_USER,     
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_NAME,     
    port:     5432                     
  }
});

pg.raw('SELECT 1')
  .then(() => {
    console.log('✅ Connection to PostgreSQL successful!');
  })
  .catch((err) => {
    console.error('❌ Connection failed! Check your connection string.');
    console.error(err.message);
  });