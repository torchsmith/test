import Footer from '@/partials/footer';
import { twMerge } from 'tailwind-merge';
import Header from '@/partials/header';
import Section from '@/components/Section';
import BackDirectory from '@/components/BackDirectory';
import { SITE_URL, headerHeight } from '@/lib/constants';
import { headerHeightMobile } from '@/lib/constants';
import Wysiwyg from '@/components/Wysiwyg';
import Heading from '@/components/Heading';
import { textClasses } from '@/lib/type';
import Button from '@/components/Button';
import loadPostBySlugEmbed from '@/api/loadPostBySlugEmbed';
import { getTaxonomy } from '@/lib/utilities';
import { Metadata, ResolvingMetadata } from 'next';

type Props = { params: { slug: string[] } };

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	let page: Awaited<ReturnType<typeof loadPostBySlugEmbed>> = false;

	page = await loadPostBySlugEmbed(params, 'career');

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
	let careers: Awaited<ReturnType<typeof loadPostBySlugEmbed>> = false;
	careers = await loadPostBySlugEmbed(params, 'career');
	if (!careers) return null;

	const departments = getTaxonomy(careers, 'department');

	return (
		<main className=''>
			<Header light={false} />
			<Section
				className={twMerge(
					'pb-10 text-navy  md:pb-20',
					headerHeight,
					headerHeightMobile
				)}
				innerClassName={twMerge('pt-10')}
			>
				<div className='mx-auto sm:w-8/12'>
					<BackDirectory
						link='/careers'
						text='Back to Careers'
					/>
				</div>
			</Section>
			<Section className='pb-10 pt-0 md:pb-10 md:pt-0'>
				<div className='mx-auto sm:w-8/12'>
					<div className={twMerge(textClasses['micro'], 'pb-4 text-red')}>
						{departments[0].name}
					</div>
					<Heading
						tag='h3'
						classLevel='h2'
						className=''
						text={careers.title['rendered']}
					/>
					{/* {careers.acf.sub_heading && (
						<div
							className={twMerge('mt-4', textClasses['large'])}
							dangerouslySetInnerHTML={{ __html: careers.acf.sub_heading }}
						></div>
					)} */}
				</div>
			</Section>

			<Section className='pb-[120px] pt-0 md:pt-0'>
				<div className='mx-auto sm:w-8/12'>
					<Wysiwyg
						className={twMerge(
							'mb-10 gap-0 [&>ul>li]:mb-2 [&>ul>li]:leading-[1.4em] [&>ul]:mt-2'
						)}
						content={careers.content['rendered']}
					/>
					<Button
						className='justify-start [&>div]:w-[140px] [&>div]:justify-center'
						variation={'primaryFill'}
						text='Apply'
						link=''
						size='small'
					/>
				</div>
			</Section>
			<Footer />
		</main>
	);
}
