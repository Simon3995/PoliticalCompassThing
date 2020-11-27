let Events = {
	drag: false
};

// start dragging
document.addEventListener('mousedown', e => {
	Events.drag = true;
	Events.prevMousePos = [e.x, e.y];
});

// stop dragging
document.addEventListener('mouseup', () => {
	Events.drag = false;
	Events.initMousePos = null;
});

// drag
document.addEventListener('mousemove', e => {
	if (Events.drag) {
		// move canvas offset
		graphic.offsetX += Events.prevMousePos[0] - e.x;
		graphic.offsetY += Events.prevMousePos[1] - e.y;
		// limit offset
		graphic.offsetX = Math.min(graphic.offsetX, c.width / 2);
		graphic.offsetX = Math.max(graphic.offsetX, -c.width / 2);
		graphic.offsetY = Math.min(graphic.offsetY, c.height / 2);
		graphic.offsetY = Math.max(graphic.offsetY, -c.height / 2);
		
		Events.prevMousePos = [e.x, e.y];
	}
});
