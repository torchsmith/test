import { twMerge } from 'tailwind-merge';
import { textClasses } from '@/lib/type';
import { useId } from 'react';

interface AuthorsProps {
	authors: string[];
	className?: string;
}

export default function Authors({ authors, className }: AuthorsProps) {
	return (
		<div
			className={twMerge(
				textClasses['large'],
				'capitalize [&:not(:last-child)]:mb-2',
				className
			)}
		>
			{authors.length == 1 ? 'By ' : 'With '}
			{authors.map((author, index) => {
				if (index != 0) {
					return ', ' + author;
				} else if (authors.length > 1 && index == authors.length - 1) {
					return ' and ' + author;
				} else {
					return `${author}`;
				}
			})}
		</div>
	);
}
