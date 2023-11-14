import { WP_EMBED__Media_Detail } from '@/types/WP_EMBED__Media_Details';
import { WP_REST_API_Attachment, WP_REST_API_Post } from 'wp-types';

export function getFeaturedMedia(post: WP_REST_API_Post) {
	if (!post) {
		return false;
	}
	if (!post._embedded || !('wp:featuredmedia' in post._embedded)) {
		return false;
	}
	const featuredMedia = post._embedded['wp:featuredmedia'];
	if (!Array.isArray(featuredMedia) || featuredMedia.length === 0) {
		return false;
	}
	// TODO is this a fail safe @Isaac
	const firstMedia = featuredMedia[0] as any;
	if (
		typeof firstMedia.source_url === 'string' &&
		firstMedia.source_url !== ''
	) {
		return firstMedia as WP_EMBED__Media_Detail;
	}
	return false;
}

export function getTaxonomy(post: any, taxonomy: string) {
	let tax = (post._embedded?.['wp:term'] || [])
		.filter((term: any) => {
			if (!term?.length) return false;

			return term[0].taxonomy === taxonomy && term[0];
		})
		.map((term: any) => {
			return term;
		});
	// console.log('taxs', tax.flat(1));

	return tax.flat(1);
}

/**
 * Decodes HTML codes in text to their text. (Ex: &#8217; -> ')
 * @param str
 * @returns
 */
export function decodeHtmlEntity(str: string) {
	str = str.replace(/&(\D+);/g, function (match, dec): string {
		switch (dec) {
			case 'nbsp':
				return ' ';
			case 'lt':
				return '<';
			case 'gt':
				return '>';
			case 'amp':
				return '&';
			case 'quot':
				return '"';
			case 'apos':
				return "'";
			case 'cent':
				return '¢';
			case 'pound':
				return '£';
			case 'yen':
				return '¥';
			case 'euro':
				return '€';
			case 'copy':
				return '©';
			case 'reg':
				return '®';
			default:
				return dec;
		}
	});

	return str.replace(/&#(\d+);/g, function (match, dec) {
		return String.fromCharCode(dec);
	});
}

export function parseToUsDate(date: any) {
	return new Date(Date.parse(date)).toLocaleString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	});
}

/**
 * Splits an array into chunks of a given size
 * @param array
 * @param size max number of items in each chunk
 * @returns
 */
export function chunkArray(array: any, size: number) {
	if (!array) return [];

	let arr = array;
	let chunk = [];
	while (arr.length > 0) {
		chunk.push(arr.splice(0, size));
	}

	return chunk;
}

/**
 * Converts From hex to RBG sting (e.g. #000000 to rgb(0,0,0)
 * Used for svg attributes
 * @param hex
 * @returns
 */
export function hex2rgb(hex: string, alpha?: number) {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);

	if (alpha) return `rgba(${r},${g},${b},${alpha})`;

	let ret = `rgb(${r},${g},${b})`;
	return ret;
}

/**
 * Inserts tailwind styles into the tag of a document if the acf field matches the skin name
 * @param skinName
 * @param acfField
 * @param styles
 * @returns
 */
export function insertSkinStyles(
	skinName: string,
	acfField: any,
	styles: string = ''
) {
	if (acfField == skinName) {
		return styles;
	}
}

/**
 * Generates a unique ID based on the current timestamp and a random number
 * @returns
 */
export function generateUniqueID(input: string) {
	const randomNum = Math.floor(Math.random() * 100000); // Random number between 0 and 9999
	return `${input}${randomNum}`.slice(6);
}

// /**
//  * Add Span tags to a string given open and close characters
//  * @param string
//  * @param charOpen
//  * @param charClose
//  * @returns
//  */
// export function addSpanTag(
// 	string: string,
// 	charOpen = '{{',
// 	charClose = '}}',
// ) {
// 	let ret = string;

// 	if (string.includes(charOpen) && string.includes(charClose)) {
// 		ret = string.replaceAll(charOpen, `<span class='text-red'>`);
// 		ret = ret.replaceAll(charClose, `</span>`);
// 	}
// 	return ret;
// }
//
