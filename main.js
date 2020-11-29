let c = document.getElementById("canvas");
let ctx = c.getContext("2d");
c.width = 800;
c.height = 800;

graphic = {
	offsetX: 0,
	offsetY: 0,
	visualOffsetX: 0,
	visualOffsetY: 0,
	segmentsPerQuad: 100,
};

update();

function update() {
	// todo: make next line not be crappy golf logic
	c.width|=0;
	
	graphic.visualOffsetX = (2*graphic.visualOffsetX + graphic.offsetX) / 3;
	graphic.visualOffsetY = (2*graphic.visualOffsetY + graphic.offsetY) / 3;
	
	ringCompass();
	drawText();
	requestAnimationFrame(update);
}

function ringCompass() {
	let segmentsPerQuad = graphic.segmentsPerQuad;
	
	let center = [c.width / 2 - graphic.visualOffsetX, c.height / 2 - graphic.visualOffsetY];
	
	ctx.lineWidth = 150;
	// draw the colour segments
	[
		[214, 60.9, 56.9],
		[350, 100, 61.6],
		[149, 70.9, 51.6],
		[54, 100, 48]
	].map((color, index, colors) => {
		nextColor = colors[index-1 & 3];
		for (let i = 0; i < segmentsPerQuad; i++) {
			let segmentCenter = i / (segmentsPerQuad + 1);
			segmentCenter = (1 + Math.tanh(10 * (segmentCenter - 0.5))) / 2;
			let interColor = [];
			for (let freq in color) {
				interColor[freq] = segmentCenter * color[freq] + (1 - segmentCenter) * nextColor[freq];
				interColor[freq] = Math.floor(interColor[freq]);
			}
			let fraction = Math.floor((segmentsPerQuad - 1) / 2) / (segmentsPerQuad);
			ctx.strokeStyle = 'hsl(' + interColor[0] + ', ' + interColor[1] + '%, ' + interColor[2] + '%)';
			ctx.beginPath();
			ctx.arc(
				...center,
				250,
				2*Math.PI * (1 - (segmentsPerQuad * (index - fraction) + i - 1.01) / (4 * segmentsPerQuad)),
				2*Math.PI * (1 - (segmentsPerQuad * (index - fraction) + i) / (4 * segmentsPerQuad)),
				true
			);
			ctx.stroke();
		}
	});
	
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
	let center = [c.width / 2 - graphic.visualOffsetX, c.height / 2 - graphic.visualOffsetY];
	
	ctx.font = "20px Tahoma";
	ctx.fillStyle = "#fff";
	ctx.textAlign = "center";
	ctx.save();
	ctx.fillText("PROGRESSIVE", center[0], center[1] + 365);
	ctx.fillText("CONSERVATIVE", center[0], center[1] -345);
	
	ctx.rotate(-Math.PI/2);
	ctx.fillText("LEFT", -center[1], center[0] - 345);
	ctx.restore();
	ctx.rotate(Math.PI/2);
	ctx.fillText("RIGHT", center[1], -center[0] - 345);
}
