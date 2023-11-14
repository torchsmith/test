'use client';
import { twMerge } from 'tailwind-merge';
import Heading from '../Heading';
import Link from 'next/link';
import { HTMLProps } from 'react';
import Wysiwyg from '../Wysiwyg';

export interface CareerCell {
	link: string;
	heading: string;
	content: string;
}

type CellCareersProps = {
	className?: string;
	cell: CareerCell;
} & HTMLProps<HTMLDivElement>;

export default function CellCareers({ className, cell }: CellCareersProps) {
	return (
		<div className={twMerge('flex flex-col', className)}>
			<Link
				href={cell.link}
				className='pb-4'
			>
				<Heading
					tag='h2'
					text={cell.heading}
					className=' text-red'
				/>
			</Link>
			<Wysiwyg
				className={twMerge('wysiwyg', 'flex flex-col gap-6')}
				content={cell.content}
				paragraphType='Large'
			/>
		</div>
	);
}
