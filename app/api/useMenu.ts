import useSWR from 'swr';
import { API_URL } from '../lib/constants';

export function useMenu({ menuId }: { menuId: number }) {
	const {
		data: menuItems,
		isLoading,
		error,
	} = useSWR([menuId], async ([menuId]) => {
		const url = API_URL + `menu/${menuId}`;
		const res = await fetch(url);

		return res.json();
	});

	return { menuItems, isLoading, error };
}
