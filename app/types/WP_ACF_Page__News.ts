import { WP_REST_API_Post } from 'wp-types';
import { WP_EMBED__Attachment } from './WP_EMBED__Attachment';

export interface WP_ACF_Page__News {
	acf: {
		news_image: WP_EMBED__Attachment;
	};
}

// WP_REST_API_Post

// export interface WP_NEWS_POST extends WP_REST_API_Post {
// 	type: 'news';
// 	acf: {
// 		news_image: WP_EMBED__Attachment;
// 	};
// }

// export interface WP_CAREER_POST extends WP_REST_API_Post {
// 	type: 'career';
// 	acf: {
// 		news_imageCAREER: WP_EMBED__Attachment;
// 	};
// }

// export interface WP_WORK_POST extends WP_REST_API_Post {
// 	type: 'work';
// 	acf: {
// 		news_imageWORK: WP_EMBED__Attachment;
// 	};
// }

// type WP_POST = WP_NEWS_POST | WP_CAREER_POST | WP_WORK_POST;

// type PostType = WP_POST['type'];

// function getPost<T extends PostType>(type: T) {
// 	// @ts-ignore
// 	const post: WP_POST = {
// 		type: 'career',
// 	};

// 	return post as Extract<WP_POST, { type: T }>;
// }

// const post = getPost('news');
