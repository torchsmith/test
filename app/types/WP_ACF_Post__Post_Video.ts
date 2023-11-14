import { WP_REST_API_Post } from 'wp-types';
import { WP_EMBED__Attachment } from './WP_EMBED__Attachment';

export interface WP_ACF_Post__Post_Video {
	type: 'posts';
	acf: {
		video: WP_EMBED__Attachment;
		subHeading: string;
	};
}
