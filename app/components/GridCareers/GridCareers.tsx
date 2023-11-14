'use client';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import Heading from '../Heading';
import Link from 'next/link';
import { miscClasses, textClasses } from '@/lib/type';
import CellNews from '../GridNews/CellNews';
import { useId, useState } from 'react';
import CellCareers, { CareerCell } from './CellCareers';
import TextHeadline from '../TextHeadline';
import Wysiwyg from '../Wysiwyg';
import { WP_ACF_Post__Career } from '@/types/WP_ACF_Post__Career';

interface GridCareersProps {
	intro: string;
	intro_no_careers: string;
	careersCells: CareerCell[];
	hasMoreContent?: boolean;
}

export default function GridCareers({
	intro,
	intro_no_careers,
	careersCells,
	hasMoreContent: moreContent = true,
}: GridCareersProps) {
	const id = useId();

	return (
		<div className='flex flex-col gap-x-[152px] md:flex-row'>
			<TextHeadline heading='Open Positions'></TextHeadline>

			<div className='mt-10 md:mt-0'>
				{careersCells.length != 0 && (
					<Wysiwyg
						className='mb-4'
						paragraphType='Large'
						content={intro}
					/>
				)}
				<div className='grid grid-cols-[repeat(1,minmax(min(10rem,100%),1fr))] gap-y-10'>
					{careersCells.length != 0 ? (
						careersCells.map((cell: CareerCell, index: number) => (
							<CellCareers
								key={id + index}
								cell={cell}
								// link={'/career/' + cell.slug}
								// heading={cell.title['rendered']}
								// content={cell.acf.summary}
								className={twMerge(index > 11 && 'inactive hidden')}
							></CellCareers>
						))
					) : (
						<Wysiwyg
							className={twMerge(
								'mb-4 [&>p>a::after]:content-none [&>p>a]:text-red [&>p>a]:underline'
							)}
							paragraphType='Large'
							content={intro_no_careers}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
