let c = document.getElementById("canvas");
let ctx = c.getContext("2d");
c.width = 800;
c.height = 800;

frame();

function frame() {
	// draw each of the quadrants
	[
		['#dd2222',0,0],
		['#22dd22',0,1],
		['#2222dd',1,0],
		['#dddd22',1,1]
	].map(dat => {
		ctx.fillStyle = dat[0];
		ctx.fillRect(dat[1]*c.width/2, dat[2]*c.height/2, c.width/2, c.height/2);
	});
	
	// draw the dividing lines
	ctx.lineWidth = 5;
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
