const LINE_CHANNEL_ACCESS_TOKEN = 'OFBEHm3kAobHWuf4AaSiKVUd8FjEvUQ/LC8setJXnuCT1dWhjSp9k/jALlLiyoU4N7rIzww10iQvXNkNXL2/SfOULPG6RNHjICzYRKWI+QGW1LHjdOAVl18zMBp4HhfxI9S32N/DmIo3+KkbyH3ORQdB04t89/1O/w1cDnyilFU=';

var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();
app.use(bodyParser.json());

var port = (process.env.PORT || 3000);
var server = app.listen(port, function () {
    console.log('Node is running on port' + port);
});

app.get('/', function (req, res, next) {
    res.send('Node is running on port' + port);
});

app.post('/webhook', function(req, res, next){
    res.status(200).end();
    for (var event of req.body.events){
        if (event.type == 'message' && event.message.text == 'パズドラ'){
            var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + LINE_CHANNEL_ACCESS_TOKEN
            }
            var body = {
                replyToken: event.replyToken,
                messages: [{
                    type: 'text',
                    text: 'ちょっと待ってね！'
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