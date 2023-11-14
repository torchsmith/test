import { API_URL } from '../lib/constants';
import { type WP_REST_API_Post } from 'wp-types';

export async function loadPostEmbed({
	postId,
	postType = 'posts',
	args = {},
}: {
	postId?: string;
	postType?: string;
	args?: any;
}) {
	let post: WP_REST_API_Post | false = false;

	try {
		const url = API_URL + `${postType}/${postId}?_embed&acf_format=standard`;
		const res = await fetch(url);

		post = await res.json();
	} catch (e) {
		console.error(e);
	}
	return post;
}
