var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

var port = (process.env.PORT || 3000);
var server = app.listen(port, function () {
    console.log('Node is running on port' + port);
});

app.get('/', function (req, res, next) {
    res.send('Node is running on port' + port);
});

app.post('/webhook', function (req, res, next) {
    res.status(200).end();
    for (var event of req.body.events) {
        if (event.type == 'message' && event.message.text == 'パズドラ') {
            var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + LINE_CHANNEL_ACCESS_TOKEN
            }
            var body = {
                replyToken: event.replyToken,
                message: [{
                    type: 'text',
                    text: 'ちょっと待ってー！'
                }]
            }
            var url = 'https://api.line.me/v2/bot/message/reply';
            request({
                url: url,
                method: 'POST',
                headers: headers,
                body: body,
                json: true
            });
        }
    }
});
