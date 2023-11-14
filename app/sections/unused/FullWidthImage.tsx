import Section from '@/components/Section';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { Bg } from '@/lib/acfFields';

interface FullWidthImageProps {
	acf: {
		background: keyof typeof Bg;
		[key: string]: any;
	};
}

export default async function FullWidthImage({ acf }: FullWidthImageProps) {
	const image = acf.image;
	return (
		<Section
			className={twMerge(Bg[acf.background], 'py-0 pb-4 md:py-0 md:pb-8')}
		>
			<Image
				className='h-auto object-cover'
				width={1232}
				height={982}
				src={image.url}
				alt={image.alt}
			/>
		</Section>
	);
}
