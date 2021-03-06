var express = require('express');
var app = express();
var router = express.Router();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname));
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/media', express.static(path.join(__dirname, 'media')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

app.get('/', function (req, res) {
    res.sendFile('app.html', { root: __dirname });
    console.log('app.html sent to user');
});

io.sockets.on('connection', function (socket) {
    console.log('a user connected');

    socket.on("playSend", function (data) {
        console.log("playReceived " + data.id);
        socket.broadcast.emit("playReceived", {id: data.id});
    });
});

server.listen(app.get('port'), function () {
    console.log('listening on *:' + app.get('port') + " " + process.env.PORT);
});