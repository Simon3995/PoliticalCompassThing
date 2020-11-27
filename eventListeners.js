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
		canvas_stuff.offsetX += Events.prevMousePos[0] - e.x;
		canvas_stuff.offsetY += Events.prevMousePos[1] - e.y;
		Events.prevMousePos = [e.x, e.y];
		// todo: make this next line not be crappy golf logic
		c.width|=0;
		ringCompass();
		drawText();
	}
});
