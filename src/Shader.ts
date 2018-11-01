/// <reference path='render.ts' />

class Shader {
	static readonly DEFAULT = new Shader(`
		#version 100
		precision mediump float;

		varying vec4 fcolor;

		void main() {
			gl_FragColor = fcolor;
		}
	`);

	program: WebGLProgram;

	private compile(type: number, code: string): WebGLShader {
		let shader = util.check(gl.createShader(type));
		gl.shaderSource(shader, code);
		gl.compileShader(shader);
		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			throw new Error(gl.getShaderInfoLog(shader) || undefined);
		}
		return shader;
	}

	constructor(code: string) {
		let vertex = this.compile(gl.VERTEX_SHADER, `
			#version 100

			attribute vec2 vertex;
			attribute vec4 color;
			varying vec4 fcolor;

			void main() {
				gl_Position = vec4(vertex, 0.0, 1.0);
				fcolor = color;
			}
		`)

		let fragment = this.compile(gl.FRAGMENT_SHADER, code);
		this.program = util.check(gl.createProgram());
		gl.attachShader(this.program, vertex);
		gl.attachShader(this.program, fragment);
		gl.linkProgram(this.program);
		if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
			throw new Error(gl.getProgramInfoLog(this.program) || undefined);
		}

		gl.detachShader(this.program, vertex);
		gl.detachShader(this.program, fragment);
		gl.deleteShader(vertex);
		gl.deleteShader(fragment);
	}

	use() {
		render.flush();
		gl.useProgram(this.program);
	}
}

Shader.DEFAULT.use();