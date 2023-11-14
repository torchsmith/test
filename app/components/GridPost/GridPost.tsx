'use client';
import { twMerge } from 'tailwind-merge';
import CellPost from '../GridPost/CellPost';
import MoreContentButton from '../MoreContentButton';
import { WP_REST_API_Post__With_Embeded } from '@/types/WP_REST_API_Post__With_Embeded';

interface GridPostProps {
	posts: WP_REST_API_Post__With_Embeded[];
	largePostAfter?: number;
	pages?: number;
	setPages?: (pages: number) => void;
	showMore?: boolean;
}

/**
 * Labels start position of Large Posts
 * @param afterIndex
 * @param index
 * @returns
 */
function calcStartPos(afterIndex: number, index: number): string {
	return index % (afterIndex + 2) == afterIndex ||
		index % (afterIndex + 2) == afterIndex + 1
		? 'md:col-span-3'
		: 'md:col-span-2';
}

export default function GridPost({
	posts,
	largePostAfter = 6,
	pages,
	setPages,
	showMore,
}: GridPostProps) {
	return (
		<>
			<div className='grid w-full grid-cols-[repeat(3,minmax(min(6rem,100%),1fr))] gap-x-4 gap-y-20 md:grid-cols-[repeat(6,minmax(min(6rem,100%),1fr))]'>
				{posts.map(
					(singlePost: WP_REST_API_Post__With_Embeded, index: number) => {
						const post = singlePost;
						if (!post) return null;

						const featured_media = post?._embedded?.['wp:featuredmedia']?.[0];
						return (
							<CellPost
								key={post.id}
								mediaAttachment={featured_media || undefined}
								link={'/insights/' + post.slug}
								heading={post.title['rendered']}
								content={post.excerpt['rendered']}
								tags={(
									post._embedded?.['wp:term']?.find((tagGroup) => {
										return (
											tagGroup.length > 0 &&
											tagGroup[0].taxonomy === 'agency-category'
										);
									}) || []
								).map((tag) => {
									return tag.name;
								})}
								categories={post.categories}
								className={twMerge(
									'col-span-3',
									calcStartPos(largePostAfter, index)
								)}
							></CellPost>
						);
					}
				)}
			</div>
			{setPages && showMore !== undefined && showMore && (
				<div className='flex w-full justify-center'>
					<MoreContentButton
						onClick={() => {
							setPages(pages ? pages + 1 : 2);
						}}
					/>
				</div>
			)}
		</>
	);
}
