import { WP_REST_API_Attachment } from 'wp-types';

export interface WP_EMBED__Media_Detail extends WP_REST_API_Attachment {
	media_details: {
		width: number;
		height: number;
	};
}
