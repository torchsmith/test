import Gallery from '@/components/Gallery';
import Section from '@/components/Section';
import { Bg } from '@/lib/acfFields';
import { WP_EMBED__Attachment } from '@/types/WP_EMBED__Attachment';
import { twMerge } from 'tailwind-merge';

interface GallerySectionProps {
	acf: {
		acf_fc_layout: string;
		background: keyof typeof Bg;
		gallery: WP_EMBED__Attachment[];
	};
}

export default async function GallerySection({ acf }: GallerySectionProps) {
	// const images = await loadPosts({
	// 	postType: 'media',
	// 	args: `?id${+acf.gallery.join(',')}`,
	// });

	// console.log(images);

	return (
		<Section className={twMerge(Bg[acf.background])}>
			<Gallery images={acf.gallery} />
		</Section>
	);
}
