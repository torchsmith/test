import { API_URL } from '@/lib/constants';
import { PostType, WP_POST } from '@/types/Post_Types';
import { WP_CUSTOM_Post__Next_Prev } from '@/types/WP_CUSTOM_Post__Next_Prev';
import { WP_EMBED__Attachment } from '@/types/WP_EMBED__Attachment';
import { WP_REST_API_Post__With_Embeded } from '@/types/WP_REST_API_Post__With_Embeded';
import { type WP_REST_API_Post } from 'wp-types';

export default async function loadPostBySlugEmbed<T extends PostType>(
	params: any,
	postType: T
) {
	let post: WP_REST_API_Post | false = false;

	try {
		// Test  to see if page is a post-type
		let apiCall = API_URL;
		apiCall += `${postType}?slug=${
			params.slug[params.slug.length - 1]
		}&_embed&acf_format=standard`;

		const res = await fetch(apiCall);

		const resJson: unknown = await res.json();

		if (Array.isArray(resJson)) {
			post = resJson[0];
		}
	} catch (e) {
		console.error(e);
	}
	return post as
		| (WP_REST_API_Post &
				Extract<WP_POST, { type: T }> &
				WP_CUSTOM_Post__Next_Prev &
				WP_REST_API_Post__With_Embeded)
		| false;
}
