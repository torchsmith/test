'use client';
import { twMerge } from 'tailwind-merge';
import { headingClasses } from '@/lib/type';

interface HeadingProps {
	tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | (string & {});
	classLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | (string & {});
	text: string;
	className?: string;
}

export default function Heading({
	tag,
	classLevel,
	text,
	className = '',
}: HeadingProps) {
	const Tag = tag as keyof JSX.IntrinsicElements;

	return (
		<Tag
			className={twMerge(headingClasses[classLevel ?? tag] ?? '', className)}
			dangerouslySetInnerHTML={{ __html: text }}
		></Tag>
	);
}
