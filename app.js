var express = require('express'),
		bodyParser = require('body-parser'),
		notify = require('push-notify'),
		handle = require('child_process').fork,
		app 	= express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/', function (req, res){
	var data = req.body ? req.body : {};
	data.os = 'ios';
	handleRequest(data);
	res.end();
});

function handleRequest(data){
	var thread;
	if(data.os === 'android'){
		thread = handle('android.js');
	} else if(data.os === 'ios'){
		thread = handle('ios.js')
	}
	thread.send({pid: thread.pid, data: data});
}

app.listen(3000, function(){console.log("Listening at port 3000");});

// var now = "";
// var time = new Date().toLocaleTimeString('latn')
// var date = new Date().toLocaleDateString('latn');
// now = date + " " + time; //Edit: changed TT to tt
// var registrationIds = [];
// registrationIds.push('APA91bEG_OTguNdZ5HVcjfulIH1kvXhoGUgQ3DbzayHyKomdBk77dinzVYUQP_Rz6bEQfEit9GjGwA6UTznX_1gslnmdZzrJI7QmCoS9_TPp_a3jOy0xi9rUkT-RGOlHhZbzrQzhGkZEH3ss5ZGNUTSc2mjHgb9zJRsTFfgSbBucuFHr5pYQRzw');
// registrationIds.push('APA91bEaG2wHmLinpJsDxU-4Q8K8PjKB5e6U_eAZjaIb9EpB-1HzN8mST2H7SxcdyHHBGat5Typ77jZoq263Z-oxSGD0zyU0I--uByMbiKXuxwH8wRvw4bJcJp2bfIVU8lJ1FxeZ8K6fuw-JlBHRX5l4Lnbf6N_BPLtvRRajn3KaWzdAsJ_nP7Q');
// registrationIds.push('APA91bGZNKXjrKrZq8_bGBPc3ufCxHUt84KV-0QP7QPgyRmWxdDRjpni4npRk7Uh3DiYj_BpWg_J6M4BKY6BvXzvx8MdvATZn6iSVq809Uvth0Z6UzdxxgLD8iSU-1EM92L0qfjVGANb4AJnvuTYWZxRhQ55DgU3vCyOY0atNIpZ7OCkiMFelLM');
// gcm.send({
// 	registrationId: registrationIds,
// 	delayWhileIdle: false,
// 	timeToLive: 5000,
// 	data:{
// 		title: 'Propuestas Nacho Peralta',
// 		message: 'Un mensaje de push-notify',
// 		timestamp: now,
// 		soundname: 'default'
// 	}
// });