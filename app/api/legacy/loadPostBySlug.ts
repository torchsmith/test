// import { API_URL } from '@/lib/constants';
// import { type WP_REST_API_Post } from 'wp-types';

// export default async function loadPostBySlug(params: any, postType = 'posts') {
// 	let page: WP_REST_API_Post | false = false;

// 	try {
// 		// Test  to see if page is a post-type
// 		let apiCall = API_URL;
// 		apiCall += `${postType}?slug=${params.slug[params.slug.length - 1]}`;

// 		const res = await fetch(apiCall);

// 		const resJson: unknown = await res.json();

// 		if (Array.isArray(resJson)) {
// 			page = resJson[0];
// 		}
// 	} catch (e) {
// 		console.error(e);
// 	}
// 	return page;
// }
