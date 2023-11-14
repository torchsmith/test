import Section from '@/components/Section';
import BackgroundVideo from '@/components/BackgroundVideo';
import { WP_REST_API_Page } from 'wp-types';
import { WP_EMBED__Attachment } from '@/types/WP_EMBED__Attachment';
import { useEffect, useState } from 'react';

interface WP_REST_API_Page_ACF extends WP_REST_API_Page {
	acf: {
		featured_video?: WP_EMBED__Attachment;
	};
}

interface acf {
	acf_fc_layout: string;
	use_featured_video: boolean;
	video: WP_EMBED__Attachment;
}

interface VideoHeroProps {
	acf: acf;
	page: WP_REST_API_Page_ACF;
}

export default async function VideoHero({ acf, page }: VideoHeroProps) {
	let video: WP_EMBED__Attachment;
	if (acf.use_featured_video) {
		video = page.acf.featured_video!;
	} else {
		video = acf.video;
	}

	return (
		<Section className='relative h-[817px] md:aspect-[1280/720] md:h-[unset]'>
			{/* md:h-[812px] */}
			{video && <BackgroundVideo src={video ? video.url : ''} />}
		</Section>
	);
}
