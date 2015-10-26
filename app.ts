import express 			=	require("express");
import bodyParser 	=	require("body-parser");
import childProcess =	require("child_process");
var handle					=	childProcess.fork;
var app							=	express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/', function (req, res) {
	var data:any = req.body ? req.body : {};
	data.os = 'ios';
	handleRequest(data);
	res.end();
});

function handleRequest(data) {
	var thread;
	if (data.os === 'android') {
		thread = handle('android.js');
	} else if (data.os === 'ios') {
		thread = handle('ios.js')
	}
	thread.send({ pid: thread.pid, data: data });
}

app.listen(3000, function () { console.log("Listening at port 3000"); });