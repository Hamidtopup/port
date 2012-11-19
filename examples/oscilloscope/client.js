var canvas = document.getElementById('osci'),
	context = canvas.getContext('2d'),
	block = 0;

context.fillStyle = '#000';
context.fillRect(0, 0, 640, 480);

var socket = io.connect();

socket.on('connect', function(){
	// console.log('connected');

	socket.on('data', function(data){
		var i, l = data.length;
		context.fillStyle = '#000';
		context.fillRect(block * 64, 0, 64, 480);
		
		context.fillStyle = '#0f0';
		for (i = 0; i < l; i += 1) {
			context.fillRect(i + (block * 64), parseInt(data[i] * 480) + 240, 1, 1);
		}
		block = (block + 1) % 10;
	});
});