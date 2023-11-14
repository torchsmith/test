import Footer from '@/partials/footer';
import Header from '@/partials/header';
import LetsChat from '@/sections/LetsChat';
import PageRenderer from '@/api/PageRender';
import loadPageEmbed from '@/api/loadPageEmbed';
import { Metadata, ResolvingMetadata } from 'next';
import { SITE_URL } from '@/lib/constants';

type Props = { params: { slug: string[] } };

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	let page: any = false;

	if (params.slug.length === 0) {
		return {
			title: 'Page Not Found',
			description: 'Page Not Found',
		};
	}

	page = await loadPageEmbed(params);

	if (!page) {
		return {
			title: 'Page Not Found',
			description: 'Page Not Found',
		};
	}

	// fetch data
	const seo = await fetch(
		SITE_URL + `wp-json/yoast/v1/get_head?url=${page.link}`
	)
		.then((res) => res.json())
		.catch(() => false);

	if (!seo) {
		return {
			title: 'Page Not Found',
			description: 'Page Not Found',
		};
	}

	// optionally access and extend (rather than replace) parent metadata
	// const previousImages = (await parent).openGraph?.images || [];

	return seo.json;
}

export default async function Page({ params }: Props) {
	let page: any = false;

	page = await loadPageEmbed(params);

	return (
		<main className=''>
			<Header light={false} />

			<PageRenderer page={page} />

			{page?.slug && page.slug != 'contact' && page.slug != 'careers' && (
				<LetsChat />
			)}
			<Footer />
		</main>
	);
}
