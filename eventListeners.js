let Events = {
	drag: false
};

document.addEventListener('mousedown', e => {
	Events.drag = true;
	Events.prevMousePos = [e.x, e.y];
});

document.addEventListener('mouseup', () => {
	Events.drag = false;
	Events.initMousePos = null;
});

document.addEventListener('mousemove', e => {
	if (Events.drag) {
		// move canvas offset
		canvas_stuff.offsetX += Events.prevMousePos[0] - e.x;
		canvas_stuff.offsetY += Events.prevMousePos[1] - e.y;
		// limit offset
		canvas_stuff.offsetX = Math.min(canvas_stuff.offsetX, c.width / 2);
		canvas_stuff.offsetX = Math.max(canvas_stuff.offsetX, -c.width / 2);
		canvas_stuff.offsetY = Math.min(canvas_stuff.offsetY, c.height / 2);
		canvas_stuff.offsetY = Math.max(canvas_stuff.offsetY, -c.height / 2);
		
		Events.prevMousePos = [e.x, e.y];
	}
});
