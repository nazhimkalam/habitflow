const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const habitRoutes = require('./routes/habitRoutes');
const authMiddleware = require('./middleware/auth');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/habits', authMiddleware, habitRoutes); // secure

app.get('/api/health', (req, res) => res.send('OK'));

module.exports = app;
