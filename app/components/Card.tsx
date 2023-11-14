import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import { headingClasses, miscClasses, textClasses } from '@/lib/type';
import Heading from './Heading';
import Button from './Button';
import { Bg } from '@/lib/acfFields';
import { WP_EMBED__Media_Detail } from '@/types/WP_EMBED__Media_Details';
import { WP_EMBED__Attachment } from '@/types/WP_EMBED__Attachment';

interface CardProps {
	heading: string;
	subheading: string;
	content: string;
	image: WP_EMBED__Attachment;
	background: string;
	buttonText?: string;
	buttonLink?: string;
}

export default function Card({
	heading,
	subheading,
	content,
	image,
	buttonText,
	buttonLink,
	background,
}: CardProps) {
	return (
		<div
			className={twMerge(
				'flex flex-col-reverse items-center md:flex-row',
				background,
				background == 'bg-navy' && 'text-cream'
			)}
		>
			<div className='flex flex-col items-center justify-center md:w-6/12'>
				<div className='mt-20 flex flex-col px-[17%] pb-14'>
					<Heading
						tag='div'
						classLevel='h3'
						text={heading}
					/>
					<div
						className={twMerge(
							miscClasses['navLight'],
							'pt-2 uppercase text-red'
						)}
					>
						{subheading}
					</div>
					<div
						className={twMerge('wysiwyg large py-6')}
						dangerouslySetInnerHTML={{ __html: content }}
					></div>
					{buttonText && buttonLink && (
						<Button
							className='self-start'
							text={buttonText}
							link={buttonLink}
						/>
					)}
				</div>
			</div>
			<div className='self-stretch md:w-6/12'>
				{image && (
					<Image
						className='h-full w-full object-cover'
						alt={image.alt}
						width={image.width}
						height={image.height}
						src={image.url}
					/>
				)}
			</div>
		</div>
	);
}
