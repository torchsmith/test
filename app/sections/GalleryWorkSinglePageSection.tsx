import Section from '@/components/Section';
import GalleryWorkSinglePage from '@/components/GalleryWorkSinglePage';
import { WP, WP_REST_API_Page } from 'wp-types';
import { WP_ACF_Post__Work } from '@/types/WP_ACF_Post__Work';
import { React_Image } from '@/types/React__Image';

interface GalleryWorkSinglePageSectionProps {
	page: WP_REST_API_Page;
}

export default async function GalleryWorkSinglePageSection({
	page,
}: GalleryWorkSinglePageSectionProps) {
	// console.log(page);
	const pageTyped = page as WP_ACF_Post__Work & WP_REST_API_Page;
	if (!pageTyped.acf) return null;
	if (!pageTyped.acf.gallery) return null;

	const images: React_Image[] = pageTyped.acf?.gallery?.map((i) => {
		const image = i;
		if (!image) return false;
		return {
			alt: image.alt,
			width: image.width,
			height: image.height,
			src: image.url,
		};
	});

	return (
		<Section className='bg-cream'>
			<GalleryWorkSinglePage images={images} />
		</Section>
	);
}
