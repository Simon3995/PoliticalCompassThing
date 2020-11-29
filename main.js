let c = document.getElementById("canvas");
let ctx = c.getContext("2d");
c.width = 800;
c.height = 800;

// object with graphical properties
graphic = {
	offsetX: 0,
	offsetY: 0,
	visualOffsetX: 0,
	visualOffsetY: 0,
	segmentsPerQuad: 100,
	center: [c.width/2, c.height/2],
};

update();

function update() {
	// clear canvas
	ctx.clearRect(0,0,c.width,c.height);
	
	// smoothly move offset to internal position
	graphic.visualOffsetX = (2*graphic.visualOffsetX + graphic.offsetX) / 3;
	graphic.visualOffsetY = (2*graphic.visualOffsetY + graphic.offsetY) / 3;
	
	// calculate center
	graphic.center = [c.width / 2 - graphic.visualOffsetX, c.height / 2 - graphic.visualOffsetY];
	
	// paint on the canvas
	drawColorSegments();
	drawSeparators();
	drawCenterCircle();
	drawText();
	
	window.requestAnimationFrame(update);
}

function drawColorSegments() {
	ctx.lineWidth = 55;
	let hs = [50, 130, 10, 220];
	
	for (let j = 0; j < 3; j++) {
		for (let i = 0; i < 4; i++) {
			ctx.strokeStyle = "hsl(" + hs[i] + ", 65%, " + (65-7*j) + "%)";
			ctx.beginPath();
			ctx.arc(
				...graphic.center,
				200 + 50*j,
				i * Math.PI / 2,
				(i+1.01) * Math.PI / 2
			);
			ctx.stroke();
		}
	}
}

function drawSeparators() {
	let center = graphic.center;
	
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
}

function drawCenterCircle() {
	let center = [c.width / 2 - graphic.visualOffsetX, c.height / 2 - graphic.visualOffsetY];
	
	// draw a center circle
	ctx.fillStyle = "#fff5";
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
	let center = graphic.center;
	
	// draw top and bottom text
	ctx.font = "20px Tahoma";
	ctx.fillStyle = "#fff";
	ctx.textAlign = "center";
	ctx.fillText("PROGRESSIVE", center[0], center[1] + 365);
	ctx.fillText("CONSERVATIVE", center[0], center[1] -345);
	
	// note: x and y are coordinates on a rotated canvas, not the original
	let drawRotatedText = (angle, text, x, y) => {
		ctx.save();
		ctx.rotate(angle);
		ctx.fillText(text, x, y);
		ctx.restore();
	}
	
	drawRotatedText(-Math.PI/2, "LEFT", -center[1], center[0] - 345);
	drawRotatedText(Math.PI/2, "RIGHT", center[1], -center[0] - 345);
}
