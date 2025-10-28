export type TransformedRow<T> = {
	[K in keyof T]: K extends `${string}_at` | `${string}_date`
		? T[K] extends string
			? Date
			: T[K]
		: T[K];
};
