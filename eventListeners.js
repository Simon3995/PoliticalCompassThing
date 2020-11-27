let Events = {
	drag: false
};

document.addEventListener('mousedown', e => {
	Events.drag = true;
	Events.initMousePos = [e.x, e.y];
});

document.addEventListener('mouseup', () => {
	Events.drag = false;
	Events.initMousePos = null;
});

document.addEventListener('mousemove', e => {
	if (Events.drag) {
		// TODO
		frame();
	}
});
