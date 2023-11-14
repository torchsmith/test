import SwiperFeatured, {
	Slides,
} from '@/components/SwiperFeatured/SwiperFeatured';
import { loadPostsEmbed } from '@/api/loadPostsEmbed';
import { WP_EMBED__Media_Detail } from '@/types/WP_EMBED__Media_Details';
import { WP_ACF_Post__Work } from '@/types/WP_ACF_Post__Work';
import { WP_REST_API_Post__With_Embeded } from '@/types/WP_REST_API_Post__With_Embeded';

interface FeaturedSliderProps {
	acf: {
		acf_fc_layout: string;
		heading: string;
		industry: string;
		button_text: string;
	};
}

export default async function SliderFeatured({ acf }: FeaturedSliderProps) {
	const works = await loadPostsEmbed({
		postType: 'work',
		args: { 'acf.industry': acf.industry },
	});
	if (!works) return null;

	const slides: Slides = {
		heading: acf.heading,
		slides: works.map((work) => {
			const media: WP_EMBED__Media_Detail | false =
				(work._embedded &&
					work._embedded['wp:featuredmedia'] &&
					work._embedded['wp:featuredmedia'][0]) ||
				false;

			return {
				mediaDetail: media,
				agencyCategory: work.acf ? work.acf.industry : '',
				postTitle: work.title['rendered'],
				// Grabs the relative path from the link
				postUrl: (work.link.match(/\/[\w-]+\/[\w-]+\//g) ?? [])[0] ?? '',
			};
		}),
		buttonText: acf.button_text,
	};

	return (
		<div>
			<SwiperFeatured slides={slides} />
		</div>
	);
}
