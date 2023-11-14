// import { API_URL } from '../lib/constants';

// export async function loadMedia(mediaId: number) {
// 	let media: any = false;

// 	try {
// 		const url = API_URL + `media/${mediaId}`;
// 		const res = await fetch(url);

// 		media = await res.json();

// 		if (media.code === 'rest_post_invalid_id') {
// 			media = false;
// 		}
// 	} catch (e) {
// 		console.error(e);
// 	}
// 	return media;
// }
