import { WP_REST_API_Post } from 'wp-types';

export interface WP_ACF_Post__News {
	type: 'news';
	acf: {
		external_link: string;
		external_link_display: string;
	};
}
