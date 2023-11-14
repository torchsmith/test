// import { API_URL } from '../lib/constants';
// import { type WP_Post } from 'wp-types';

// export async function loadPost(postId: number, postType: string = 'posts') {
// 	let post: WP_Post | false = false;

// 	try {
// 		const url = API_URL + `${postType}/${postId}`;
// 		const res = await fetch(url);

// 		post = await res.json();
// 	} catch (e) {
// 		console.error(e);
// 	}
// 	return post;
// }
