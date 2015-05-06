var apn 	 	=		require('apn'),
		pid 	 	=		null,
		tokens 	=		[],
		now 	 	=		"",
		options = {
			cert: "devCert.pem",
      key: "devKey.pem",
      //passphrase: "Tgbed259",
      //connectionTimeout: 3600,
      production: false
		};

var time = new Date().toLocaleTimeString('latn')
var date = new Date().toLocaleDateString('latn');
now = date + " " + time; //Edit: changed TT to tt
tokens.push('cf1ddf9e61a6c2e73c8d2b7ef73a52655b98de94270f9a159fa2a579a97d89cd');
process.on('message', function (request){
  pid = request.pid;		// Process ID del hilo.
  data = request.data;	// Datos de la notificación.

  var apnConnection = new apn.Connection(options);	// Crea la conexión con el servicio APN.
  var notification = new apn.Notification();	// Objeto con los datos de la notificación.

  notification.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
  notification.badge = 0;
  notification.sound = "default";
  notification.alert = 'Un mensaje de push-notify';
  notification.payload = {
  	timestamp: now
  };

  apnConnection.pushNotification(notification, tokens);

	// Notificación exitosamente enviada...
	apnConnection.on('transmitted', function (message, deviceToken){
    console.log('iOS: ' + message.alert);
		process.kill(pid);
	});

	//error
  apnConnection.on('transmissionError', function (error, message, deviceToken) {
    console.log("Error: " + message.data.message);
    false;
    process.kill(pid);
  });
});