const express = require('express');
const path = require('path');
const routes = require('./routes/routes');
const errorHandler = require('./middleware/errorhandler');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);
app.use(errorHandler);

app.listen(PORT, function () {
  console.log('Server running on http://localhost:' + PORT);
});