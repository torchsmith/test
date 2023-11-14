import GalleryWork, { WorkCard } from '@/components/GalleryWork';
import Section from '@/components/Section';
import { loadPostsEmbed } from '@/api/loadPostsEmbed';
import { WP_ACF_Post__Work } from '@/types/WP_ACF_Post__Work';
import { WP_REST_API_Post } from 'wp-types';

interface GalleryWorkSectionProps {
	acf: {
		acf_fc_layout: string;
	};
}

export default async function GalleryWorkSection({
	acf,
}: GalleryWorkSectionProps) {
	const works = await loadPostsEmbed({
		postType: 'work',
		orderby: 'menu_order',
		order: 'asc',
		args: { meta_key: 'visible', meta_value: 1, meta_compare: '=' },
	});
	if (!works) return null;

	const workCards: WorkCard[] = works.map((work) => {
		const image = work.acf.gallery_image;
		return {
			title: work.title.rendered,
			slug: work.slug,
			image: image
				? {
						alt: image.alt,
						width: image.width,
						height: image.height,
						src: image.url,
				  }
				: (false as false),
			industry: work.acf.industry,
		};
	});

	return (
		<Section className='bg-cream'>
			<GalleryWork workCards={workCards} />
		</Section>
	);
}
