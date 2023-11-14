import { WP_CUSTOM_Term__X_Category } from '@/types/WP_CUSTOM_Term__X_Category';
import { API_URL } from '../lib/constants';
import useSWR from 'swr';
import { WP_REST_API_Term, type WP_REST_API_Terms } from 'wp-types';

export function useTerms({ taxonomy = 'categories' }: { taxonomy?: string }) {
	const {
		data: terms,
		error,
		isLoading,
	} = useSWR<(WP_REST_API_Term & WP_CUSTOM_Term__X_Category)[]>(
		API_URL + `${taxonomy}`,
		async (url: string) => {
			const res = await fetch(url);

			return res.json();
		}
	);

	return { terms, error, isLoading };
}
