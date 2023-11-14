import { WP_REST_API_Post } from 'wp-types';

interface NextPrev {
	id: number;
	slug: string;
}

export interface WP_CUSTOM_Post__Next_Prev {
	next: null | NextPrev;

	previous: null | NextPrev;
}
