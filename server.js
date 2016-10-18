var express = require('express');

var bodyParser = require('body-parser');

var handler = require('./server/request-handler');

var app = express();

app.use(express.static(__dirname + '/client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// app.get('/login', ??);
// app.post('/login', handler.signIn);

app.get('/destination', handler.fetchTodos)
app.post('/destination', handler.addDestination);

app.get('/destination/images', handler.fetchImages);

app.post('/destination/todo', handler.addTodo);

app.post('/destination/todo/vote', handler.updateVotes);

app.post('/destination/todo/image', handler.addImageTodo);

app.post('/destination/todo/remove', handler.removeTodo);

app.get('/places', handler.fetchPlaces);

app.listen(3000, function() {
  console.log('Listening on port 3000');
});