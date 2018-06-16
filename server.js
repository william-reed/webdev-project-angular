//Install express server
const express = require('express');
const path = require('path');
var cors = require('cors')

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/sms-reminder'));
app.use(cors());

app.get('/*', function(req,res) {

  res.sendFile(path.join(__dirname,'/dist/sms-reminder/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
