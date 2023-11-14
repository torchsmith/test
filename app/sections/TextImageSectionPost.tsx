import { getFeaturedMedia, getTaxonomy } from '@/lib/utilities';
import { twMerge } from 'tailwind-merge';
import Section from '@/components/Section';
import { Bg, Paragraph_Type } from '@/lib/acfFields';
import TextMediaPost from '@/components/TextImagePost';
import { loadPostEmbed } from '@/api/loadPostEmbed';
import { WP_EMBED__Post } from '@/types/WP_EMBED__Post';

interface TextMediaSectionPostProps {
	acf: {
		acf_fc_layout: string;
		background: keyof typeof Bg;
		direction: string;
		show_tags: boolean;
		post: WP_EMBED__Post;
		heading: string;
		sub_heading: string;
		paragraph_type: keyof typeof Paragraph_Type;
	};
	postOverride?: any;
}

export default async function TextMediaSectionPost({
	acf,
	postOverride,
}: TextMediaSectionPostProps) {
	if (!acf.post) {
		return null;
	}
	const post = postOverride ?? (await loadPostEmbed({ postId: acf.post.ID }));
	const featuredMedia = getFeaturedMedia(post);
	const tags = getTaxonomy(post, 'post_tag');

	const mediaClasses =
		'min-h-[237px] xl:flex-shrink-[2] xl:max-w-[704px] max-h-[459px] object-cover xl:self-center order-2';
	const textGroupCol = '[&>div>div]:flex-col xl:[&>div>div]:max-w-[400px]';
	return (
		<Section className={twMerge(Bg[acf.background], 'py-0 md:py-0')}>
			{featuredMedia && (
				<TextMediaPost
					classes={{
						direction: acf.direction,
						paragraph_type: acf.paragraph_type,
						background: acf.background,
					}}
					heading={acf.heading}
					subheading={acf.sub_heading}
					title={post.title?.['rendered']}
					content={post.content?.['rendered']}
					image={featuredMedia}
					link={'/insights/' + post.slug}
					// tags={tags.map((tag: any) => {
					// 	return tag.name;
					// })}
				/>
			)}
		</Section>
	);
}
