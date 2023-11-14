import { twMerge } from 'tailwind-merge';
import { textClasses } from '@/lib/type';
import { useId } from 'react';

interface TagsProps {
	tags: string[];
	className?: string;
	rounded?: boolean;
}

export default function Tags({ tags, className, rounded = false }: TagsProps) {
	const id = useId();

	if (!rounded) tags = tags.filter((tag) => tag != 'Featured');

	return (
		<div className={twMerge('flex flex-wrap', className)}>
			{tags.map((tag, index) => {
				return (
					<div
						key={id + index}
						className={twMerge(
							rounded
								? 'rounded-full border border-navy px-6 py-2 text-center'
								: (textClasses['micro'], 'text-red')
						)}
					>
						{index != 0 && !rounded && ', '}
						{tag}
					</div>
				);
			})}
		</div>
	);
}
