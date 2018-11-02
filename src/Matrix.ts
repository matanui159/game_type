export default class Matrix {
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

	transform(x: number, y: number): {x: number, y: number} {
		// TODO: maybe add a type for this?
		return {
			x: this.m00 * x + this.m01 * y + this.m02,
			y: this.m10 * x + this.m11 * y + this.m12
		}
	}

	translate(x: number, y: number): Matrix {
		let trans = this.transform(x, y);
		return new Matrix(
			this.m00,
			this.m01,
			trans.x,
			this.m10,
			this.m11,
			trans.y
		);
	}

	scale(width: number, height: number): Matrix {
		return new Matrix(
			this.m00 * width,
			this.m01 * height,
			this.m02,
			this.m10 * width,
			this.m11 * height,
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