import * as render from './render';
import Shader from './Shader';
import Matrix from './Matrix';

Shader.DEFAULT.use();

function draw() {
	render.drawRect(
		Matrix.IDENTITY.translate(-1, -1).scale(2, 2),
		0xFF0000FF
	);
	render.flush();

	requestAnimationFrame(draw);
}
draw();