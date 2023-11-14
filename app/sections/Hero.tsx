import Section from '@/components/Section';
import Heading from '@/components/Heading';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { headerHeight, headerHeightMobile } from '@/lib/constants';
import { WP_EMBED__Attachment } from '@/types/WP_EMBED__Attachment';

interface HeroProps {
	acf: {
		acf_fc_layout: string;
		heading: string;
		banner: string;
		image: WP_EMBED__Attachment;
		height: string;
		color: string;
		max_width_pixels: number;
	};
}

export default async function Hero({ acf }: HeroProps) {
	const image = acf.image;

	return (
		<Section
			className={twMerge(
				'text-navy  md:pb-0',
				acf.height == 'Short' && 'md:min-h-[416px]',
				(acf.height == 'Default' || acf.height == '') && 'md:min-h-[613px]',
				acf.color == 'White' && 'bg-white',
				(acf.color == 'Default' || acf.color == '') && 'bg-cream',
				headerHeight,
				headerHeightMobile
			)}
			innerClassName={twMerge(
				'flex [&>*]:flex-none justify-start flex-col gap-5 md:gap-4 pt-14 md:pt-28',
				acf.height == 'Short' && 'items-center'
			)}
		>
			<div className='relative flex h-full  flex-col md:flex-row'>
				<div
					className={twMerge(
						'pb-16',
						// Calc Wraps Text around the image (100% - 50% of image - offset)
						image && 'md:max-w-[min(calc(100%-calc(512px/2)-150px),714px)]'
					)}
				>
					<Heading
						tag='h1'
						classLevel={''}
						text={acf.heading}
						className='flex-1 shrink-0 uppercase misc-nav-light'
					/>
					<div style={{ maxWidth: `${acf.max_width_pixels ?? 714}px` }}>
						<Heading
							tag='div'
							classLevel={'h1'}
							text={acf.banner}
							className='wysiwyg flex-1 shrink-0 pt-6' // 712px doesn't break properly
						/>
					</div>
				</div>
				{image && (
					<div className='h-full overflow-visible md:absolute md:bottom-0 md:right-0 md:flex md:items-end md:self-stretch'>
						<Image
							alt={image.alt}
							width={image.width}
							height={image.height}
							src={image.url}
							className='md:h-[540px] md:w-[512px]'
						/>
					</div>
				)}
			</div>
		</Section>
	);
}
