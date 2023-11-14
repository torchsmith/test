import { WP_REST_API_Term } from 'wp-types';

export interface WP_CUSTOM_Term__X_Category extends WP_REST_API_Term {
	count_news: number;
	count_posts: number;
}
