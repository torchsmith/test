import { WP_REST_API_Post } from 'wp-types';
import { WP_EMBED__Attachment } from './WP_EMBED__Attachment';

export interface WP_ACF_Post__Work {
	type: 'work';
	acf: {
		visible: boolean;
		video: WP_EMBED__Attachment;
		logo: WP_EMBED__Attachment;
		logo_colored: WP_EMBED__Attachment;
		gallery_image: WP_EMBED__Attachment;
		industry: string;
		gallery: WP_EMBED__Attachment[] | false;
	};
}
