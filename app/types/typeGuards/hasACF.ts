// type ObjectWithACF<T> = T extends { acf: any } ? T : never;

// type test = ObjectWithACF<{ acf?: boolean }>;

// export function hasACF<T>(obj: T): ObjectWithACF<T> {
// 	if (
// 		typeof obj === 'object' &&
// 		obj !== null &&
// 		'acf' in obj &&
// 		obj.acf !== undefined
// 	)
// 		return obj as ObjectWithACF<T>;
// 	else throw new Error('Object does not have ACF');
// }

// export function hasACFArray<T>(arr: Array<T>): Array<ObjectWithACF<T>> {
// 	const filteredArr = arr.filter(
// 		(obj) =>
// 			typeof obj === 'object' &&
// 			obj !== null &&
// 			'acf' in obj &&
// 			obj.acf !== undefined
// 	) as Array<ObjectWithACF<T>>;

// 	if (filteredArr.length === arr.length) {
// 		return filteredArr;
// 	} else {
// 		throw new Error('Some objects in the array do not have ACF');
// 	}
// }
