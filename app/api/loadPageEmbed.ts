import { API_URL } from '@/lib/constants';
import { type WP_REST_API_Post } from 'wp-types';

export default async function loadPageEmbed(params: any) {
	let page: WP_REST_API_Post | false = false;

	try {
		const postTypes = ['news', 'work', 'industries'];

		// Test  to see if page is a post-type
		let apiCall = API_URL;
		if (params.slug.length == 1 || !postTypes.includes(params.slug[0])) {
			apiCall += `pages?slug=${
				params.slug[params.slug.length - 1]
			}&_embed&acf_format=standard`;
		} else {
			apiCall += `${params.slug[0]}?slug=${params.slug
				.slice(1)
				.join('/')}&_embed&acf_format=standard`;
		}

		const res = await fetch(apiCall);

		const resJson: unknown = await res.json();

		if (Array.isArray(resJson)) {
			page = resJson[0];
		}
	} catch (e) {
		console.error(e);
	}
	return page;
}
