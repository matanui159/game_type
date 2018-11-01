/// <reference path='util.ts' />

class Matrix {
	static readonly IDENTITY = new Matrix(
		1, 0, 0,
		0, 1, 0
	);

	private constructor(
		public m00: number,
		public m01: number,
		public m02: number,
		public m10: number,
		public m11: number,
		public m12: number,
	) {}

	transform(point: Point): Point;
	transform(x: number, y: number): Point;
	transform(x: Point | number, y?: number): Point {
		let point: Point;
		if (typeof x === 'number') {
			point = {
				x: x,
				y: y!
			}
		} else {
			point = x;
		}

		return {
			x: this.m00 * point.x + this.m01 * point.y + this.m02,
			y: this.m10 * point.x + this.m11 * point.y + this.m12
		}
	}

	translate(point: Point): Matrix;
	translate(x: number, y: number): Matrix;
	translate(x: Point | number, y?: number): Matrix {
		let point: Point;
		if (typeof x === 'number') {
			point = this.transform(x, y!);
		} else {
			point = this.transform(x);
		}

		return new Matrix(
			this.m00,
			this.m01,
			point.x,
			this.m10,
			this.m11,
			point.y
		);
	}

	scale(size: Size): Matrix;
	scale(width: number, height: number): Matrix;
	scale(width: Size | number, height?: number): Matrix {
		let size: Size;
		if (typeof width === 'number') {
			size = {
				width: width,
				height: height!
			}
		} else {
			size = width;
		}

		return new Matrix(
			this.m00 * size.width,
			this.m01 * size.height,
			this.m02,
			this.m10 * size.width,
			this.m11 * size.height,
			this.m12
		);
	}

	rotate(angle: number) {
		let cos = Math.cos(angle);
		let sin = Math.sin(angle);
		return new Matrix(
			this.m00 * cos + this.m01 * sin,
			this.m01 * cos - this.m00 * sin,
			this.m02,
			this.m10 * cos + this.m11 * sin,
			this.m11 * cos - this.m10 * sin,
			this.m12
		);
	}
}