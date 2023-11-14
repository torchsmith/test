'use client';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import Heading from '../Heading';
import Link from 'next/link';
import { textClasses } from '@/lib/type';
import { HTMLProps } from 'react';
import { parseToUsDate } from '@/lib/utilities';

type CellNewsProps = {
	className?: string;
	link: string;
	linkDisplay: string;
	heading: string;
	date: string;
	content: string;
} & HTMLProps<HTMLDivElement>;

export default function CellNews({
	className,
	link,
	linkDisplay,
	heading,
	date,
	content,
}: CellNewsProps) {
	return (
		<div className={twMerge('flex flex-col', className)}>
			{link ? (
				<Link
					href={link}
					className='mb-4 border-b border-cyan pb-4'
				>
					<Heading
						tag='h2'
						text={heading}
						className='flex min-h-[3lh] items-end'
					/>
				</Link>
			) : (
				<div className='mb-4 border-b border-cyan pb-4'>
					<Heading
						tag='h2'
						text={heading}
						className='flex min-h-[3lh] items-end'
					/>
				</div>
			)}
			<div className='mb-4'>{parseToUsDate(date)}</div>
			<div
				className={twMerge('wysiwyg', 'mb-4 flex flex-col gap-6')}
				dangerouslySetInnerHTML={{
					__html: content,
				}}
			/>
			{link && (
				<Link
					href={link}
					className={twMerge(
						textClasses['default'],
						'hidden flex-row items-center gap-2 text-cyan md:flex [&:visited]:text-dark-cyan'
					)}
				>
					{linkDisplay}
				</Link>
			)}
		</div>
	);
}
