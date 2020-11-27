let c = document.getElementById("canvas");
let ctx = c.getContext("2d");
c.width = 800;
c.height = 800;

canvas_stuff = {
	offsetX: 0,
	offsetY: 0,
};

update();

function update() {
	// todo: make next line not be crappy golf logic
	c.width|=0;
	ringCompass();
	drawText();
	requestAnimationFrame(update);
}

function frame() {
	// draw each of the quadrants
	[
		['#ff3b5b88',0,0],
		['#2cdb8188',0,1],
		['#4e89d488',1,0],
		['#f5dc0088',1,1]
	].map(dat => {
		ctx.fillStyle = dat[0];
		ctx.fillRect(dat[1]*c.width/2, dat[2]*c.height/2, c.width/2, c.height/2);
	});
	
	// draw the dividing lines
	ctx.strokeStyle = "#222";
	ctx.lineWidth = 4;
	[
		[[0, c.height/2], [c.width, c.height/2]],
		[[c.width/2, 0], [c.width/2, c.height]]
	].map(dat => {
		ctx.beginPath();
		ctx.moveTo(...dat[0]);
		ctx.lineTo(...dat[1]);
		ctx.stroke();
	});
}

function ringCompass() {
	segments = 12;
	
	center = [c.width / 2 - canvas_stuff.offsetX, c.height / 2 - canvas_stuff.offsetY];
	
	// draw the colour segments
	for (let i=0; i<segments; i++) {
		ctx.lineWidth = 150;
		ctx.strokeStyle = "hsl("+(360*i/segments - 100)%360+", 65%, 65%)";
		ctx.beginPath();
		ctx.arc(
			...center,
			250,
			2*Math.PI - (i*2*Math.PI / segments),
			2*Math.PI - ((i+1.02)*2*Math.PI / segments),
			true
		);
		ctx.stroke();
	}
	
	// draw the dividing lines
	ctx.strokeStyle = "#222";
	ctx.lineWidth = 12;
	[
		[[center[0] - c.width/2, center[1]], [center[0] + c.width/2, center[1]]],
		[[center[0], center[1] - c.height/2], [center[0], center[1] + c.height/2]]
	].map(dat => {
		ctx.beginPath();
		ctx.moveTo(...dat[0]);
		ctx.lineTo(...dat[1]);
		ctx.stroke();
	});
	
	// draw a center circle
	ctx.fillStyle = "#ffffff55";
	ctx.beginPath();
	ctx.arc(
		...center,
		160,
		0,
		2*Math.PI,
	);
	ctx.fill();
}

function drawText() {
	ctx.font = "20px Tahoma";
	ctx.fillStyle = "#fff";
	ctx.textAlign = "center";
	ctx.save();
	ctx.fillText("PROGRESSIVE", 400, 765);
	ctx.fillText("CONSERVATIVE", 400, 55);
	
	ctx.rotate(-Math.PI/2);
	ctx.fillText("LEFT", -400, 55);
	ctx.restore();
	ctx.rotate(Math.PI/2);
	ctx.fillText("RIGHT", 400, -745);
}
