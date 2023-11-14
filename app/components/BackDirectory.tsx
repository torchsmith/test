import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import Link from 'next/link';
import { textClasses } from '@/lib/type';

interface BackDirectoryProps {
	text: string;
	link: string;
	className?: string;
}

export default function BackDirectory({
	text,
	link,
	className,
}: BackDirectoryProps) {
	return (
		<Link
			href={link}
			className={twMerge('flex items-center gap-x-4', className)}
		>
			<Image
				src='/media/button-back.svg'
				width={40}
				height={40}
				alt='Back'
			/>
			<div className={twMerge(textClasses['micro'], 'text-red')}>{text}</div>
		</Link>
	);
}
