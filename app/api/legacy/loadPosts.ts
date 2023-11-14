// import { API_URL } from '../lib/constants';
// import { WP_REST_API_Post } from 'wp-types';
// import { WP_ACF_Post__Career } from '@/types/WP_ACF_Post__Career';
// import { WP_ACF_Post__Team_Member } from '@/types/WP_ACF_Post__Team_Member';
// import { WP_ACF_Post__Work } from '@/types/WP_ACF_Post__Work';
// import { WP_ACF_Post__News } from '@/types/WP_ACF_Post__News';
// import { WP_ACF_Post__Post_Video } from '@/types/WP_ACF_Post__Post_Video';

// type WP_POST =
// 	| WP_ACF_Post__Career
// 	| WP_ACF_Post__Team_Member
// 	| WP_ACF_Post__News
// 	| WP_ACF_Post__Post_Video
// 	| WP_ACF_Post__Work
// 	| (Omit<WP_REST_API_Post, 'type'> & { type: 'posts' })
// 	| (Omit<WP_REST_API_Post, 'type'> & { type: 'pages' });

// type PostType = WP_POST['type'];

// export async function loadPosts<T extends PostType>({
// 	postType,
// 	max = 10,
// 	args = {},
// 	orderby = 'date',
// 	order = 'desc',
// }: {
// 	postType?: T;
// 	max?: number;
// 	args?: any;
// 	orderby?: string;
// 	order?: string;
// }) {
// 	let posts: any = false;

// 	try {
// 		// const res = await fetch(API_URL + `pages?slug=${params.slug.join('/')}`);

// 		args = Object.keys(args)
// 			.map((key) => `${key}=${encodeURIComponent(args[key])}`)
// 			.join('&');

// 		const url =
// 			API_URL +
// 			`${
// 				postType ?? 'posts'
// 			}?per_page=${max}&orderby=${orderby}&order=${order}&${args}`;

// 		const res = await fetch(url);

// 		posts = await res.json();
// 	} catch (e) {
// 		console.error(e);
// 	}
// 	return posts as Extract<WP_POST, { type: T }>[] | false;
// }

// // const posts = await loadPosts({ postType: 'career' });
