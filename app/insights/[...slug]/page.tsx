import Footer from '@/partials/footer';
import { twMerge } from 'tailwind-merge';
import Header from '@/partials/header';
import LetsChat from '@/sections/LetsChat';
import Section from '@/components/Section';
import TextMediaPost from '@/components/TextImagePost';
import BackDirectory from '@/components/BackDirectory';
import { SITE_URL, headerHeight } from '@/lib/constants';
import { headerHeightMobile } from '@/lib/constants';
import Wysiwyg from '@/components/Wysiwyg';
import Tags from '@/components/Tags';
import NavPost from '@/sections/NavPost';
import GridPost from '@/components/GridPost/GridPost';
import BackgroundVideo from '@/components/BackgroundVideo';
import Heading from '@/components/Heading';
import { textClasses } from '@/lib/type';
import Authors from '@/components/Authors';
import loadPostBySlugEmbed from '@/api/loadPostBySlugEmbed';
import { loadPostsEmbed } from '@/api/loadPostsEmbed';
import { Metadata, ResolvingMetadata } from 'next';
import { WP_ACF_Post__Post_Video } from '@/types/WP_ACF_Post__Post_Video';
import { WP_EMBED__Tag } from '@/types/WP_EMBED__Tags';
import {
	WP_PLUGIN__Publish_Press_Author,
	WP_PLUGIN__Publish_Press_Authors,
} from '@/types/WP_PLUGIN__Publish_Press_Authors';

// TODO: Make bio usuable for multiple authors
type Props = { params: { slug: string[] } };

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const page = await loadPostBySlugEmbed(params, 'posts');
	if (!page) {
		return {
			title: '404',
			description: '404',
			openGraph: {
				title: '404',
				description: '404',
			},
		};
	}

	// fetch data
	const seo = await fetch(
		SITE_URL + `wp-json/yoast/v1/get_head?url=${page.link}`
	).then((res) => res.json());

	// optionally access and extend (rather than replace) parent metadata
	// const previousImages = (await parent).openGraph?.images || [];

	return seo.json;
}

export default async function Page({ params }: Props) {
	const page = await loadPostBySlugEmbed(params, 'posts');
	if (!page) return null;
	if (
		page._embedded['wp:term'] == undefined ||
		page._embedded['wp:featuredmedia'] == undefined ||
		page._embedded['wp:term'] == undefined
	)
		return null;
	// Check if post is a video post
	let page_video: WP_ACF_Post__Post_Video | false =
		page as WP_ACF_Post__Post_Video;
	if (page_video.acf.video == undefined) page_video = false;

	// console.log(page);

	const tags =
		page._embedded['wp:term'].find((termGroup: WP_EMBED__Tag[]) => {
			if (termGroup[0] == undefined) return false;
			return termGroup[0].taxonomy == 'agency-category';
		}) || [];
	// console.log(page._embedded['wp:term']);
	console.log(tags);

	const categories_postType =
		page._embedded['wp:term'].find((termGroup: WP_EMBED__Tag[]) => {
			if (termGroup[0] == undefined) return false;
			return termGroup[0].taxonomy == 'category';
		}) || [];
	// console.log('categories', categories_postType);

	let authors: WP_PLUGIN__Publish_Press_Authors | false =
		page.authors as WP_PLUGIN__Publish_Press_Authors;
	if (!authors) authors = false;
	if (authors && authors.length > 0 && authors[0].display_name == undefined)
		authors = false;
	// console.log(authors);

	// Bottom Page Posts
	let posts = await loadPostsEmbed({
		postType: 'posts',
		// Written Posts have 5 bottom posts, Video posts have 2
		max: categories_postType.some((cat: WP_EMBED__Tag) => {
			return cat.slug == 'written';
		})
			? 5
			: 2,
	});

	return (
		<main className=''>
			<Header light={false} />
			<Section
				className={twMerge('pb-8 text-navy', headerHeight, headerHeightMobile)}
				innerClassName={twMerge('pt-10')}
			>
				<BackDirectory
					className='ml-[104px]'
					link='/insights'
					text='Back to All Insights'
				/>
			</Section>
			{/* Header Section*/}
			{page_video && page_video.acf.video ? (
				<Section className='pb-14 pt-0 md:pt-0'>
					{/* Video */}
					<div className='relative mb-20 h-[693px] w-full'>
						<BackgroundVideo
							src={page_video.acf.video.url}
							controls={true}
						></BackgroundVideo>
					</div>
					<div className='mx-auto w-8/12'>
						{tags && (
							<Tags
								className='mb-4'
								tags={tags.map((tag: WP_EMBED__Tag) => {
									return tag.name;
								})}
							/>
						)}
						<Heading
							tag='h3'
							classLevel='h2'
							className='max-w-[504px]'
							text={page.title['rendered']}
						/>
						{authors && (
							<Authors
								authors={authors.map(
									(author: WP_PLUGIN__Publish_Press_Author) => {
										return author.display_name;
									}
								)}
								className={twMerge('mt-4', textClasses['large'])}
							/>
						)}
					</div>
				</Section>
			) : (
				<Section className='pb-14 pt-0 md:pb-[120px] md:pt-0 [&>div>div>div>div>div]:self-center'>
					{/* Written */}
					<TextMediaPost
						image={page._embedded['wp:featuredmedia'][0]}
						heading=''
						subheading=''
						tags={tags.map((tag: WP_EMBED__Tag) => {
							return tag.name;
						})}
						authors={
							authors
								? authors.map((author: WP_PLUGIN__Publish_Press_Author) => {
										console.log(author);
										return author.display_name;
								  })
								: []
						}
						title={page.title['rendered']}
					></TextMediaPost>
				</Section>
			)}

			<Section className='pb-14 pt-0 md:pb-[104px] md:pt-0'>
				<div className='mx-auto sm:w-8/12'>
					<Wysiwyg
						className={twMerge(
							'gap-0',
							// Ul Styling
							'[&>ul>li::before]:text-red [&>ul>li]:mb-2 [&>ul]:ml-4',
							//Custom heading Styling
							'[&>:is(h1,h2,h3,h4,h5,h6)]:mb-4',
							//First letter styling
							categories_postType.some(
								(cat: WP_EMBED__Tag) => cat.slug == 'written'
							) &&
								'[&>:first-child:first-letter]:float-left [&>:first-child:first-letter]:block [&>:first-child:first-letter]:text-[64px] [&>:first-child:first-letter]:font-extrabold [&>:first-child:first-letter]:leading-[0.75em] [&>:first-child:first-letter]:text-red'
						)}
						content={page.content['rendered']}
					/>

					{authors && (
						<div className={twMerge(authors.length == 1 && 'mt-20')}>
							<div className='wysiwyg flex flex-col gap-4'>
								{authors.length > 1 && (
									<Heading
										tag='h5'
										text='About the Hosts'
										className='mt-8 text-red'
									/>
								)}
								{authors.map((author: WP_PLUGIN__Publish_Press_Author) => (
									<>
										<p
											className='text-[12px] leading-[24px] tracking-[0.03em]'
											dangerouslySetInnerHTML={{ __html: author.description }}
										></p>
									</>
								))}
							</div>
							<hr className='my-4 text-cyan'></hr>
							<div className='flex flex-row'>
								<span
									className={twMerge(
										textClasses['micro'],
										'my-auto mr-16 uppercase text-red'
									)}
								>
									Tags
								</span>
								<Tags
									className='gap-4'
									rounded={true}
									tags={tags.map((tag: WP_EMBED__Tag) => {
										return tag.name;
									})}
								></Tags>
							</div>
						</div>
					)}
				</div>
			</Section>
			<Section className='pt-0 md:pt-0'>
				<NavPost
					classes={{ background: 'White' }}
					page={page}
				/>
			</Section>
			<Section className='bg-light-cream pb-[120px] pt-20 md:pt-[104px]'>
				{posts && (
					<GridPost
						posts={posts}
						largePostAfter={
							categories_postType.some(
								(cat: WP_EMBED__Tag) => cat.slug == 'written'
							)
								? 3
								: 0
						}
					/>
				)}
			</Section>
			<LetsChat />
			<Footer />
		</main>
	);
}
