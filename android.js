var gcm 	= require('push-notify').gcm({
			apiKey: 'AIzaSyDyczChXoV-NPDUlV0uFKjEHciRE-m2sd0',
			retries: 4
		});
var pid;
var registrationIds = [];
var now = "";
var time = new Date().toLocaleTimeString('latn')
var date = new Date().toLocaleDateString('latn');
now = date + " " + time; //Edit: changed TT to tt
registrationIds.push('APA91bEkUcswRFUfg2kiQVjleJ8bEEzzX-HVwb6z8DqZTbkdJ0-eqXIPhbffm0Chn4IRCVH1NLg28ClBAMM4S-xWP8afslOdrvnDk2PK7XjCPF3KqbVWNhJ0CbsBnRJx8g46Drnyn0ttzESLae1pYwO31p3MFeoKcg');
process.on('message', function (request){
  pid = request.pid;
  data = request.data;
	gcm.send({
		registrationId: registrationIds,
		delayWhileIdle: true,
		timeToLive: 5000,
		data:{
			title: 'Propuestas Nacho Peralta',
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