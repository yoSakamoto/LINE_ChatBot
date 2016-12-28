var express = require('express');
var app = express();

var port = (process.env.PORT || 3000);
var server = app.listen(port, function () {
    console.log('Node is running on port' + port);
});

app.get('/', function (req, res, next) {
    res.send('Node is running on port' + port);
});

app.post('/webhook', function (req, res, next) {
    res.status(200).end();
    for (var event.type == body.events) {
        if (evnet.type == "message") {
            console.log(event.message);
        }
    }
});
