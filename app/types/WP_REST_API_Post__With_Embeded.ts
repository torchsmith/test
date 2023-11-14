import { WP_REST_API_Post } from 'wp-types';
import { WP_EMBED__Tag } from './WP_EMBED__Tags';
import { WP_EMBED__Author } from './WP_EMBED__Author';
import { WP_EMBED__Media_Detail } from './WP_EMBED__Media_Details';

export interface WP_REST_API_Post__With_Embeded extends WP_REST_API_Post {
	_embedded: {
		author: WP_EMBED__Author[];
		'wp:featuredmedia'?: WP_EMBED__Media_Detail[];
		// Wordpress returns an 2 dimensional array for tags. Love Wordpress
		'wp:term'?: WP_EMBED__Tag[][];
	};
}
