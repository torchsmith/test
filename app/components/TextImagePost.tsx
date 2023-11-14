'use client';
import { twMerge } from 'tailwind-merge';
import { textClasses } from '@/lib/type';
import Heading from '@/components/Heading';
import Authors from './Authors';
import Image from 'next/image';
import Link from 'next/link';
import { Bg, Paragraph_Type } from '@/lib/acfFields';
import Tags from './Tags';
import { motion } from 'framer-motion';
import TextHeadline from './TextHeadline';
import { WP_EMBED__Media_Detail } from '@/types/WP_EMBED__Media_Details';

interface TextMediaPostProps {
	classes?: {
		background: keyof typeof Bg;
		direction: string;
		paragraph_type: keyof typeof Paragraph_Type;
	};
	tags?: string[];
	authors?: string[];
	image: WP_EMBED__Media_Detail;
	heading?: string;
	subheading?: string;
	title: string;
	link?: string;
	content?: string;
}

export default function TextMediaPost({
	classes = {
		background: 'White',
		direction: 'Image Right',
		paragraph_type: 'Large',
	},
	tags = [],
	authors = [],
	image,
	heading = '',
	link = '',
	subheading = '',
	title,
	content = '',
}: TextMediaPostProps) {
	const mediaClasses = twMerge('');
	const textGroupCol = '[&>div>div]:flex-col xl:[&>div>div]:max-w-[400px]';

	content = content.length > 240 ? content.slice(0, 240) + '...' : content;

	return (
		<motion.div
			// initial={{ opacity: 0, translateY: 10 }}
			// whileInView={{ opacity: 1, translateY: 0 }}
			// viewport={{ amount: 0.5 }}
			// transition={{ ease: 'easeInOut' }}
			className={twMerge(
				`flex flex-col justify-between xl:mt-0 xl:flex-shrink`,
				classes.direction == 'Image Left' && 'xl:flex-row',
				classes.direction == 'Image Right' && 'xl:flex-row-reverse'
			)}
		>
			<div className={twMerge('mt-8 contents xl:mt-0', textGroupCol)}>
				{/* Text Group */}
				<div className='contents'>
					<div
						className={twMerge(
							'contents h-fit flex-col justify-between gap-[72px] xl:flex xl:flex-row'
						)}
					>
						{heading && (
							<TextHeadline
								heading={heading}
								subHeading={subheading}
								className='pb-12 xl:pb-0'
							/>
						)}

						<div
							className={twMerge(
								'order-3 flex flex-col self-center pt-6 xl:pt-[unset]'
							)}
						>
							{tags.length > 0 && (
								<Tags
									tags={tags}
									className='mb-2'
								/>
							)}
							<Link
								href={link}
								className='mb-6 block'
							>
								<Heading
									tag='h2'
									text={title}
								/>
							</Link>
							{authors.length > 0 && (
								<Authors
									authors={authors.map((author: string) => {
										return author;
									})}
									className={twMerge(
										'[&:not(:last-child)]:mb-2',
										textClasses['large']
									)}
								/>
							)}
							<div
								className={twMerge(
									'wysiwyg',
									'flex flex-col gap-6',
									Paragraph_Type[classes.paragraph_type!]
								)}
								dangerouslySetInnerHTML={{
									__html: content,
								}}
							/>
						</div>
					</div>
				</div>
			</div>
			{image && (
				<Link
					href={link}
					className='order-2 xl:max-w-[704px]'
				>
					<Image
						className={twMerge('object-contain')}
						alt={image.alt_text}
						width={image.media_details.width}
						height={image.media_details.height}
						src={image.source_url}
					/>
				</Link>
			)}
		</motion.div>
	);
}
