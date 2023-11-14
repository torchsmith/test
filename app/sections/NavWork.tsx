import Section from '@/components/Section';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { Bg } from '@/lib/acfFields';
import Link from 'next/link';
import { headingClasses } from '@/lib/type';
import { WP_REST_API_Post } from 'wp-types';
import { WP_CUSTOM_Post__Next_Prev } from '@/types/WP_CUSTOM_Post__Next_Prev';
import { WP_ACF_Post__Work } from '@/types/WP_ACF_Post__Work';

interface NavWorkProps {
	acf: {
		background: keyof typeof Bg;
	};
	page: WP_REST_API_Post & WP_CUSTOM_Post__Next_Prev & WP_ACF_Post__Work;
}

export default async function NavWork({ acf, page }: NavWorkProps) {
	const logo = page.acf.logo_colored ? page.acf.logo_colored : page.acf.logo;

	const next = page.next;
	const previous = page.previous;

	// const works = await loadPosts({ postType: 'work' });
	const logoClasses = 'mx-auto';
	const linkClasses = 'capitalize flex flex-row items-center gap-2';
	const linkImageClasses = 'h-[25px] w-[13px]';

	return (
		<Section
			className={twMerge(
				Bg[acf.background],
				'pb-[50px] pt-[55px] md:pb-[50px] md:pt-[55px]'
			)}
		>
			{logo && (
				<Image
					className={twMerge(
						logoClasses,
						!page.acf.logo_colored && 'rounded bg-navy p-4'
					)}
					width={280}
					height={176}
					src={logo.url}
					alt={logo.alt}
				/>
			)}

			<div className='mt-[108px] flex flex-col gap-4  sm:flex-row sm:justify-between'>
				{next && (
					<Link
						className={twMerge(linkClasses, headingClasses['h2'])}
						href={`${next['slug']}`}
					>
						<Image
							width={10}
							height={23}
							className={twMerge(linkImageClasses)}
							src='/media/next-prev-arrow.svg'
							alt='next arrow'
						/>
						{next['slug'].replaceAll('-', ' ')}
					</Link>
				)}
				{previous && (
					<Link
						className={twMerge(
							linkClasses,
							headingClasses['h2'],
							'flex-row-reverse self-start sm:flex-row sm:text-end'
						)}
						href={`${previous['slug']}`}
					>
						{previous['slug'].replaceAll('-', ' ')}
						<Image
							width={25}
							height={13}
							src='/media/next-prev-arrow.svg'
							alt='previous arrow'
							className={twMerge(linkImageClasses, 'rotate-180 transform')}
						/>
					</Link>
				)}
			</div>
		</Section>
	);
}
