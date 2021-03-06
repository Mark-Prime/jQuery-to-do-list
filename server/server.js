const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/list.routes')

// server variables 
var PORT = process.env.PORT || 5000;
const app = express();

// inits .use apps
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));

// ROUTES
app.use('/list', router)

// Start listening for requests on a specific port
app.listen(PORT, () => {
    console.log('listening on port', PORT);
});