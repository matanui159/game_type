/// <reference path='Matrix.ts' />

namespace render {
	let canvas = document.getElementsByTagName('canvas')[0];
	export let gl = util.check(canvas.getContext('webgl'));

	const VERTEX_COUNT = 600;
	const VERTEX_SIZE = 12;
	let buffer_data = new ArrayBuffer(VERTEX_COUNT * VERTEX_SIZE);
	let buffer_float = new Float32Array(buffer_data);
	let buffer_byte = new Uint8Array(buffer_data);

	let buffer = util.check(gl.createBuffer());
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.enableVertexAttribArray(0);
	gl.enableVertexAttribArray(1);
	gl.vertexAttribPointer(0, 2, gl.FLOAT, false, VERTEX_SIZE, 0);
	gl.vertexAttribPointer(1, 4, gl.UNSIGNED_BYTE, true, VERTEX_SIZE, 8);

	let count = 0;
	function drawVertex(point: Point, color: Color) {
		buffer_float.set([
			point.x,
			point.y
		], count * 3);

		buffer_byte.set([
			color.red,
			color.green,
			color.blue,
			color.alpha || 255
		], count * VERTEX_SIZE + 8);

		if (++count === VERTEX_COUNT) {
			flush();
		}
	}

	export function drawRect(matrix: Matrix, color: Color) {
		let p00 = matrix.transform({x: 0, y: 0});
		let p01 = matrix.transform({x: 0, y: 1});
		let p10 = matrix.transform({x: 1, y: 0});
		let p11 = matrix.transform({x: 1, y: 1});
		drawVertex(p00, color);
		drawVertex(p01, color);
		drawVertex(p10, color);
		drawVertex(p01, color);
		drawVertex(p10, color);
		drawVertex(p11, color);
	}

	export function flush() {
		if (count > 0) {
			gl.bufferData(
				gl.ARRAY_BUFFER,
				buffer_data.slice(0, count * VERTEX_SIZE),
				gl.STREAM_DRAW
			);
			gl.drawArrays(gl.TRIANGLES, 0, count);
			count = 0;
		}
	}
}

let gl = render.gl;