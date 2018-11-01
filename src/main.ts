/// <reference path='Shader.ts' />

namespace main {
	function draw() {
		render.drawRect(
			Matrix.IDENTITY.translate(-1, -1).scale(2, 2),
			{red: 0, green: 0, blue: 0}	
		);
		render.flush();

		requestAnimationFrame(draw);
	}
	draw();
}