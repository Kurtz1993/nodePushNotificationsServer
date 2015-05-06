var gcm 	= require('push-notify').gcm({
			apiKey: '',
			retries: 4
		});
var pid;
var registrationIds = [];
var now = "";
var time = new Date().toLocaleTimeString('latn')
var date = new Date().toLocaleDateString('latn');
now = date + " " + time; //Edit: changed TT to tt
process.on('message', function (request){
  pid = request.pid;
  data = request.data;
	gcm.send({
		registrationId: registrationIds,
		delayWhileIdle: true,
		timeToLive: 5000,
		data:{
			title: 'Título de la notificación',
			message: data.message ? data.message : 'Un mensaje de push-notify',
			timestamp: now,
			soundname: 'default'
		}
	});

	// Notificación exitosamente enviada...
	gcm.on('transmitted', function (res, message, regId){
		console.dir('Android: ' + message.data.message);
		process.kill(pid);
	});

	//error
  gcm.on('transmissionError', function (error, message, registrationId) {
    console.log("Error: " + message.data.message);
    false;
    process.kill(pid);
  });
});