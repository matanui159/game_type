interface Point {
	x: number;
	y: number;
}

interface Size {
	width: number;
	height: number;
}

interface Color {
	red: number;
	green: number;
	blue: number;
	alpha?: number;
}

namespace util {
	export function check<T>(value?: T | null): T {
		if (typeof value === 'undefined') {
			throw new TypeError('undefined');
		} else if (value === null) {
			throw new TypeError('null');
		} else {
			return value;
		}
	}
}