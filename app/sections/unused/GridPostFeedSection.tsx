import Section from '@/components/Section';
import { loadPostsEmbed } from '@/api/loadPostsEmbed';
import GridPost from '@/components/GridPost/GridPost';

interface GridPostFeedSectionProps {
	acf: any;
}

export default async function GridPostFeedSection({
	acf,
}: GridPostFeedSectionProps) {
	let posts = await loadPostsEmbed({
		postType: 'posts',
		max: 30,
	});
	if (!posts) return null;
	if (
		posts[0] &&
		posts[0]._embedded?.['wp:featuredmedia'] &&
		posts[0]._embedded?.['wp:featuredmedia'][0].source_url &&
		posts[0]._embedded?.['wp:term'] &&
		posts[0]._embedded?.['wp:term'][0][0].name
	)
		return null;

	return (
		<Section className='bg-white'>
			<GridPost posts={posts}></GridPost>
		</Section>
	);
}
