import { type } from 'os';
import { WP_REST_API_Post } from 'wp-types';

export interface WP_ACF_Post__Team_Member {
	type: 'team-member';
	acf: {
		role: string;
	};
}
