import { WP_REST_API_Post } from 'wp-types';
import { WP_ACF_Post__Career } from './WP_ACF_Post__Career';
import { WP_ACF_Post__News } from './WP_ACF_Post__News';
import { WP_ACF_Post__Post_Video } from './WP_ACF_Post__Post_Video';
import { WP_ACF_Post__Team_Member } from './WP_ACF_Post__Team_Member';
import { WP_ACF_Post__Work } from './WP_ACF_Post__Work';
import { WP_ACF_Post__Case_Study } from './WP_ACF_Post__Case_Study';

export type WP_POST =
	| WP_ACF_Post__Career
	| WP_ACF_Post__Team_Member
	| WP_ACF_Post__News
	| WP_ACF_Post__Post_Video
	| WP_ACF_Post__Work
	| WP_ACF_Post__Post_Video
	| WP_ACF_Post__Case_Study
	// | (Omit<WP_REST_API_Post, 'type'> & { type: 'posts' })
	| (Omit<WP_REST_API_Post, 'type'> & { type: 'pages' });

export type PostType = WP_POST['type'];
