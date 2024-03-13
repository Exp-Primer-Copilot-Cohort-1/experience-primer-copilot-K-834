// Create web server
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// Read the file and return the comments
app.get('/comments', function (req, res) {
  fs.readFile( __dirname + "/" + "comments.json", 'utf8', function (err, data) {
    console.log( data );
    res.end( data );
  });
})

// Add a new comment
app.post('/addComment', urlencodedParser, function (req, res) {
  // Prepare output in JSON format
  response = {
    name: req.body.name,
    comment: req.body.comment
  };
  console.log(response);
  fs.readFile( __dirname + "/" + "comments.json", 'utf8', function (err, data) {
    data = JSON.parse( data );
    data.push(response);
    console.log( data );
    fs.writeFile(__dirname + "/" + "comments.json", JSON.stringify(data), function (err) {
      if (err) {
        console.log(err);
      }
    });
  });
  res.end( JSON.stringify(response));
})

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Server started at http://%s:%s", host, port)
})
