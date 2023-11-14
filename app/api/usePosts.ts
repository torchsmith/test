import useSWRInfinite from 'swr/infinite';
import { API_URL } from '../lib/constants';
import { WP_REST_API_Post, type WP_REST_API_Posts } from 'wp-types';
import { WP_REST_API_Post__With_Embeded } from '@/types/WP_REST_API_Post__With_Embeded';
import { PostType, WP_POST } from '@/types/Post_Types';

export function usePosts<T extends PostType>({
	postType,
	max = 10,
	urlparams = {},
	orderby = 'date',
	order = 'desc',
	offset = 0,
}: {
	postType?: T;
	max?: number;
	urlparams?: any;
	orderby?: string;
	order?: string;
	offset?: number;
}) {
	urlparams = Object.keys(urlparams)
		.map((key) => `${key}=${encodeURIComponent(urlparams[key])}`)
		.join('&');

	function getKey(pageIndex: number, previousPageData: any) {
		if (
			previousPageData &&
			(!previousPageData.length || previousPageData.length < max)
		) {
			return null;
		}
		const url =
			API_URL +
			`${postType}?per_page=${max}&page=${
				pageIndex + 1
			}&orderby=${orderby}&order=${order}${
				offset != 0 ? '&offset=' + (max * pageIndex + offset) : ''
			}&_embed&acf_format=standard&${urlparams}`;

		return url;
	}

	const { data, isValidating, error, size, setSize } = useSWRInfinite<
		(Extract<WP_POST, { type: T }> & WP_REST_API_Post__With_Embeded)[]
	>(getKey, async (url: string) => {
		const res = await fetch(url);

		return res.json();
	});

	const showMore =
		isValidating ||
		(!isValidating &&
			data?.length &&
			data.length >= size &&
			data[data.length - 1].length >= max)
			? true
			: false;

	return { postPages: data, isValidating, showMore, error, size, setSize };
}
