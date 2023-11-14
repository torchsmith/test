'use client';
import { twMerge } from 'tailwind-merge';
import CellNews from '../GridNews/CellNews';
import MoreContentButton from '../MoreContentButton';
import { WP_REST_API_Post__With_Embeded } from '@/types/WP_REST_API_Post__With_Embeded';
import { WP_ACF_Post__News } from '@/types/WP_ACF_Post__News';

interface GridNewsProps {
	posts: (WP_ACF_Post__News & WP_REST_API_Post__With_Embeded)[];
	pages?: number;
	setPages?: (pages: number) => void;
	showMore?: boolean;
}

export default function GridNews({
	posts,
	pages,
	setPages,
	showMore,
}: GridNewsProps) {
	return (
		<>
			<div className='grid grid-cols-[repeat(1,minmax(min(6rem,100%),1fr))] gap-x-4 gap-y-10 md:grid-cols-[repeat(3,minmax(min(10rem,100%),1fr))] md:gap-y-20 [&:not(:first-child)]:mt-20'>
				{posts[0] &&
					'title' in posts[0] &&
					posts.map(
						(post, index: number) =>
							post && (
								<CellNews
									key={post.id}
									link={post.acf?.external_link}
									linkDisplay={post.acf?.external_link_display}
									heading={post.title['rendered']}
									date={post.date}
									content={post.content['rendered'].slice(0, 240)}
								></CellNews>
							)
					)}
			</div>
			{setPages && showMore !== undefined && showMore && (
				<MoreContentButton
					onClick={() => {
						setPages(pages ? pages + 1 : 2);
					}}
				/>
			)}
		</>
	);
}
