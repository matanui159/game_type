namespace amd {
	type Modules = {[name: string]: () => any};
	let modules: Modules = {};

	export function define(name: string, deps: string[], callback: (...deps: any) => void) {
		modules[name] = () => {
			console.debug(`Loading module '${name}'`);
			let exports = {};
			callback.apply(undefined, deps.map((name: string) => {
				switch (name) {
					case 'require':
						return require;
					case 'exports':
						return exports;
					default:
						return require(name);
				}
			}));

			modules[name] = () => {
				return exports;
			}
			return exports;
		}
	}

	export function require(name: string): any {
		if (typeof modules[name] === 'undefined') {
			throw new Error(`Undefined module '${name}'`);
		} else {
			return modules[name]();
		}
	}
}
let define = amd.define;