// import { API_URL } from '../lib/constants';
// import { type WP_REST_API_Terms } from 'wp-types';

// export async function loadTerms({
// 	taxonomy = 'categories',
// }: {
// 	taxonomy?: string;
// }) {
// 	let terms: WP_REST_API_Terms = [];

// 	try {
// 		const url = API_URL + `${taxonomy}`;

// 		const res = await fetch(url);

// 		terms = await res.json();
// 	} catch (e) {
// 		console.error(e);
// 	}
// 	return terms;
// }
