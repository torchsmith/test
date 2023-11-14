import { twMerge } from 'tailwind-merge';
import Section from '@/components/Section';
import { Bg } from '@/lib/acfFields';
import SwiperPostGrid from '@/components/SwiperPostGrid/SwiperPostGrid';
import { loadPostsEmbed } from '@/api/loadPostsEmbed';
import { getFeaturedMedia } from '@/lib/utilities';
import { React_Image } from '@/types/React__Image';

interface PostGridProps {
	acf: {
		acf_fc_layout: string;
		background: keyof typeof Bg;
	};
}

export default async function PostGrid({ acf }: PostGridProps) {
	const posts = await loadPostsEmbed({ postType: 'posts', max: 6 });

	if (!posts) {
		return null;
	}

	// const featuredMedias = posts.map((post: any) => {
	// 	return getFeaturedMedia(post);
	// });

	// console.log(posts);

	const images: React_Image[] = posts.map((post) => {
		if (post._embedded['wp:featuredmedia'] === undefined) return false;
		const image = post._embedded['wp:featuredmedia'][0];
		if (!image) return false;
		return {
			alt: image.alt_text,
			width: image.media_details.width,
			height: image.media_details.height,
			src: image.source_url,
		};
	});

	return (
		<Section className={twMerge(Bg[acf.background], 'py-0 md:py-0')}>
			<SwiperPostGrid
				posts={posts || []}
				featuredMedias={images || []}
			/>
		</Section>
	);
}
