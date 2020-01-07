const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const routes = require('./controllers/planner_controller.js');

app.use(routes);

app.listen(PORT, function() {
  console.log(`Server listening on http://localhost:${PORT}`);
});