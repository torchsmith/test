import { parseToUsDate } from '@/lib/utilities';
import { twMerge } from 'tailwind-merge';
import Section from '@/components/Section';
import Heading from '@/components/Heading';
import Image from 'next/image';
import Link from 'next/link';
import { Bg } from '@/lib/acfFields';
import { loadPostsEmbed } from '@/api/loadPostsEmbed';
import TextHeadline from '@/components/TextHeadline';
import { WP_ACF_Page__News } from '@/types/WP_ACF_Page__News';
import { WP_ACF_Post__News } from '@/types/WP_ACF_Post__News';

interface TextMediaFeaturedNewsSectionProps {
	acf: {
		background: keyof typeof Bg;
		[key: string]: any;
	};
	page: WP_ACF_Page__News;
}

export default async function TextMediaFeaturedNewsSection({
	acf,
	page,
}: TextMediaFeaturedNewsSectionProps) {
	const posts = await loadPostsEmbed({
		postType: 'news',
		max: 1,
		orderby: 'date',
	});
	if (!posts) return null;
	const featuredNews = posts[0];
	if (featuredNews.acf?.external_link == undefined) return null;

	const image = page.acf?.news_image ? page.acf.news_image : false;

	const mediaClasses =
		'min-h-[237px] xl:flex-shrink-[2] xl:max-w-[704px] max-h-[459px] object-cover xl:self-center order-2';
	return (
		<Section
			className={twMerge(
				Bg[acf.background],
				'pb-[112px] pt-8 md:pb-[112px] md:pt-8'
			)}
		>
			<div
				className={twMerge(
					`flex flex-col xl:mt-0 xl:flex-row-reverse xl:gap-16`
				)}
			>
				<div className={twMerge('mt-8 contents xl:mt-0 xl:flex xl:w-[55%]')}>
					{/* Custom Text Group */}
					<div className='contents xl:block xl:w-full'>
						<div className='order-1 flex w-fit flex-col pb-[56px] xl:min-w-0 xl:pb-12'>
							<TextHeadline heading='Latest News' />
						</div>

						<div
							className={twMerge(
								'order-3 flex flex-col self-center pt-6 xl:w-full xl:pt-[unset]'
							)}
						>
							<Link
								href={featuredNews.acf.external_link}
								className='mb-6 block'
							>
								<Heading
									tag='h2'
									text={featuredNews.title['rendered']}
								/>
							</Link>
							<div className='mb-4'>{parseToUsDate(featuredNews.date)}</div>
							<div
								className={twMerge('wysiwyg', 'flex flex-col gap-6')}
								dangerouslySetInnerHTML={{
									__html: featuredNews.content['rendered'].slice(0, 240),
								}}
							/>
						</div>
					</div>
				</div>
				{image && (
					<Image
						className={twMerge(
							'order-2 max-h-[458px] min-h-[237px] object-contain xl:w-[45%] xl:max-w-[461px] xl:flex-shrink-[2] xl:self-center'
						)}
						alt={image.alt}
						width={image.width}
						height={image.height}
						src={image.url}
					/>
				)}
			</div>
		</Section>
	);
}
