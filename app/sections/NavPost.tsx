import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { Bg } from '@/lib/acfFields';
import Link from 'next/link';
import { headingClasses } from '@/lib/type';
import { WP_REST_API_Page, WP_REST_API_Post } from 'wp-types';
import { WP_CUSTOM_Post__Next_Prev } from '@/types/WP_CUSTOM_Post__Next_Prev';

interface NavPostProps {
	classes: {
		background: keyof typeof Bg;
	};
	page: WP_REST_API_Post & WP_CUSTOM_Post__Next_Prev;
}

export default async function NavPost({ classes, page }: NavPostProps) {
	const next = page.next;
	const previous = page.previous;

	console.log('Next Prev');
	console.log(next);
	console.log(previous);

	const linkClasses = 'capitalize flex flex-row items-center gap-2';
	const linkImageClasses = 'h-[25px] w-[13px]';

	return (
		<div className='flex flex-col gap-4 pb-[72px] sm:flex-row sm:justify-between md:pb-[120px]'>
			{next && (
				<Link
					className={twMerge(linkClasses, headingClasses['h4'])}
					href={`${next['slug']}`}
				>
					<Image
						width={40}
						height={40}
						src='/media/next-prev-button.svg'
						alt='next arrow'
					/>
					{next['slug'].replaceAll('-', ' ')}
				</Link>
			)}
			{previous && (
				<Link
					className={twMerge(
						linkClasses,
						headingClasses['h4'],
						'flex-row-reverse self-start sm:ml-auto sm:flex-row sm:text-end'
					)}
					href={`${previous['slug']}`}
				>
					{previous['slug'].replaceAll('-', ' ')}
					<Image
						width={40}
						height={40}
						src='/media/next-prev-button.svg'
						alt='previous arrow'
						className={twMerge('rotate-180 transform')}
					/>
				</Link>
			)}
		</div>
	);
}
