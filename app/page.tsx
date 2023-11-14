import Footer from '@/partials/footer';
import Header from '@/partials/header';
import PageRenderer from './api/PageRender';
import LetsChat from './sections/LetsChat';
import loadPageEmbed from './api/loadPageEmbed';
import { SITE_URL } from './lib/constants';
import { Metadata } from 'next';

// DO NOT WORK IN HERE UNLESS YOU ARE EDITING HEADER OR FOOTER

export async function generateMetadata(): Promise<Metadata> {
	let page: any = false;

	page = await loadPageEmbed({ slug: ['home'] });

	// fetch data
	const seo = await fetch(
		SITE_URL + `wp-json/yoast/v1/get_head?url=${page.link}`
	).then((res) => res.json());

	return seo.json;
}

export default async function Home() {
	let page: any = false;

	page = await loadPageEmbed({ slug: ['home'] });

	return (
		// <main className=''>
		// 	<Header light={false} />
		// 	<div className='h-[1000px]'></div>
		// 	<Footer />
		// </main>
		<main className=''>
			<Header
				fadeBg={true}
				light={true}
			/>

			<PageRenderer page={page} />

			<LetsChat />
			<Footer />
		</main>
	);
}
