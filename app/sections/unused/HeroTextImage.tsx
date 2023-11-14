import { decodeHtmlEntity, getTaxonomy } from '@/lib/utilities';
import { twMerge } from 'tailwind-merge';
import { textClasses } from '@/lib/type';
import Image from 'next/image';

interface HeroTextImageProps {
	acf: {
		[key: string]: any;
	};
	page: any;
}

export default async function HeroTextImage({ acf, page }: HeroTextImageProps) {
	const video = page.acf.video;
	const logo = page.acf.logo;
	const categories = getTaxonomy(page, 'work_category');
	const tags = getTaxonomy(page, 'work_tags');

	const mediaClasses =
		'xl:flex-shrink-[2] object-cover xl:self-center min-h-[679px]';
	return (
		<div className='flex flex-col-reverse justify-between bg-navy md:flex-row-reverse'>
			<div className='flex min-h-[679px] flex-col items-center justify-center px-[16%] md:w-6/12'>
				<Image
					className='mt-auto'
					width={270}
					height={170}
					src={logo.url}
					alt={logo.alt}
				/>
				<div className='mb-10 mt-auto flex max-w-[504px] flex-col text-center text-cream'>
					<hr className='text-cyan' />
					<div className='pt-6 font-heading text-[16px] font-medium uppercase tracking-[0.20em]'>
						{decodeHtmlEntity(categories[0].name)}
					</div>
					<div className={twMerge(textClasses['micro'], 'border-l-red pt-6')}>
						{tags.map((tag: any, key: number) => (
							<span
								key={key}
								className='mb-2 inline-block border-r-red px-2 [&:not(:last-child)]:border-r'
							>
								{decodeHtmlEntity(tag.name)}
							</span>
						))}
					</div>
				</div>
			</div>
			<div className='md:w-6/12'>
				{video && (
					<video
						autoPlay
						loop
						muted
						className={twMerge(mediaClasses)}
					>
						<source
							src={video.url}
							type='video/mp4'
						></source>
					</video>
				)}
			</div>
		</div>
	);
}
