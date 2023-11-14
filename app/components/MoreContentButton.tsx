import { miscClasses } from '@/lib/type';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';

interface Props {
	onClick: () => void;
}

export default function MoreContentButton({ onClick }: Props) {
	return (
		<button
			onClick={onClick}
			className={twMerge(
				miscClasses['nav'],
				'group mt-[100px] flex w-full flex-col items-center justify-center uppercase text-red'
			)}
		>
			<Image
				src='/media/more-content.svg'
				alt='arrow'
				width={40}
				height={40}
				className='mb-4  transition-transform group-hover:translate-y-2'
			/>
			More Content
		</button>
	);
}
