import { WP_REST_API_Post } from 'wp-types';
import { API_URL } from '../lib/constants';
import { WP_REST_API_Post__With_Embeded } from '@/types/WP_REST_API_Post__With_Embeded';
import { PostType, WP_POST } from '@/types/Post_Types';

export async function loadPostsEmbed<T extends PostType>({
	postType,
	max = 10,
	args = {},
	orderby = 'date',
	order = 'desc',
}: {
	postType?: T;
	max?: number;
	args?: any;
	orderby?: string;
	order?: string;
}) {
	let posts: any = false;

	try {
		// const res = await fetch(API_URL + `pages?slug=${params.slug.join('/')}`);

		args = Object.keys(args)
			.map((key) => `${key}=${encodeURIComponent(args[key])}`)
			.join('&');

		const url =
			API_URL +
			`${
				postType ?? 'posts'
			}?per_page=${max}&orderby=${orderby}&order=${order}&_embed&acf_format=standard&${args}`;

		// console.log('url', url);

		const res = await fetch(url);

		posts = await res.json();
	} catch (e) {
		console.error(e);
	}
	return posts as
		| (WP_REST_API_Post &
				Extract<WP_POST, { type: T }> &
				WP_REST_API_Post__With_Embeded)[]
		| false;
}

// const posts = await loadPostsEmbed({ postType: 'career' });
