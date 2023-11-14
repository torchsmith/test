import { WP_REST_API_Attachment, WP_REST_API_Post } from 'wp-types';
import { WP_EMBED__Attachment } from './WP_EMBED__Attachment';

export interface WP_PLUGIN__Publish_Press_Author {
	term_id: number;
	user_id: number;
	is_guest: number;
	slug: string;
	display_name: string;
	avatar_url: string;
	user_url: string;
	last_name: string;
	first_name: string;
	description: string;
}

export type WP_PLUGIN__Publish_Press_Authors =
	WP_PLUGIN__Publish_Press_Author[];
