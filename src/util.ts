export function create<T>(value: T | null, name: string): T {
	// TODO: maybe rename this?
	if (value === null) {
		throw new Error(`Failed to create ${name}`);
	} else {
		return value;
	}
}