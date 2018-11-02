import * as util from './util';
import gl from './gl';
import Matrix from './Matrix';

const VERTEX_COUNT = 600;
const VERTEX_SIZE = 12;
let buffer_data = new ArrayBuffer(VERTEX_COUNT * VERTEX_SIZE);
let buffer_float = new Float32Array(buffer_data);
let buffer_int = new Uint32Array(buffer_data);

let buffer = util.create(gl.createBuffer(), 'buffer');
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.enableVertexAttribArray(0);
gl.enableVertexAttribArray(1);
gl.vertexAttribPointer(0, 2, gl.FLOAT, false, VERTEX_SIZE, 0);
gl.vertexAttribPointer(1, 4, gl.UNSIGNED_BYTE, true, VERTEX_SIZE, 8);

let count = 0;
function drawVertex(vertex: {x: number, y: number}, color: number) {
	buffer_float.set([vertex.x, vertex.y], count * 3);
	buffer_int.set([color], count * 3 + 2);
	if (++count === VERTEX_COUNT) {
		flush();
	}
}

export function drawRect(matrix: Matrix, color: number) {
	// TODO: maybe have a proper color type?
	let p00 = matrix.transform(0, 0);
	let p01 = matrix.transform(0, 1);
	let p10 = matrix.transform(1, 0);
	let p11 = matrix.transform(1, 1);
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