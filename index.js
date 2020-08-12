const express = require('express');
const logger = require('./utils/logger');
const cors = require('cors');
const app = express();

//Init middleware
app.use(cors());
app.use(express.json({ extended: false }));

app.use((req, res, next) => {
  logger.log('info', req.method);
  next();
});

//Define routes
app.use('/', require('./routes/router'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => logger.log('info', `Server started on port: ${PORT}`));
