// import SwiperLogo from '@/components/SwiperLogo/SwiperLogo';
import { loadPostsEmbed } from '@/api/loadPostsEmbed';
import { WP_EMBED__Attachment } from '@/types/WP_EMBED__Attachment';
import { WP_REST_API_Attachments } from 'wp-types';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const SwiperLogo = dynamic(() => import('@/components/SwiperLogo/SwiperLogo'), {
	ssr: false,
});

interface SliderLogoProps {
	acf: {
		acf_fc_layout: string;
		images: WP_EMBED__Attachment[];
		fetch_from_industry: boolean;
		industry: string;
	};
}

export default async function SliderLogo({ acf }: SliderLogoProps) {
	let images: WP_EMBED__Attachment[];

	if (acf.fetch_from_industry) {
		let works = await loadPostsEmbed({
			postType: 'work',
			args: { 'acf.industry': acf.industry },
		});

		images = works
			? works.map((work) => {
					return work?.acf?.logo;
			  })
			: [];
		// console.log('SliderLogo setting images from industry', { acf, works });
	} else {
		images = acf.images;
		// console.log('SliderLogo setting images from acf', { acf });
	}

	console.log('SliderLogo', images.length);

	// if (images.length === 0) {
	// 	return null;
	// }

	// console.log(images);

	return (
		<SwiperLogo
			// acf={acf}
			images={images}
		/>
	);
}
