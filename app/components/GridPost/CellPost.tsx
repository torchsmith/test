'use client';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import Heading from '../Heading';
import Link from 'next/link';
import { HTMLProps } from 'react';
import Tags from '../Tags';
import { motion } from 'framer-motion';
import { WP_EMBED__Media_Detail } from '@/types/WP_EMBED__Media_Details';

type CellPostProps = {
	className?: string;
	mediaAttachment: WP_EMBED__Media_Detail | undefined;
	mediaClassName?: string;
	link: string;
	heading: string;
	content: string;
	tags: string[];
	categories?: number[];
} & HTMLProps<HTMLDivElement>;

export default function CellPost({
	className,
	mediaAttachment,
	mediaClassName,
	link,
	heading,
	content,
	tags,
}: CellPostProps) {
	return (
		<motion.div
			initial={{ opacity: 0, translateY: 10 }}
			animate={{ opacity: 1, translateY: 0 }}
			transition={{ duration: 0.35 }}
			className={twMerge('flex flex-col', className)}
		>
			<Link
				href={link}
				className='mb-10'
			>
				{mediaAttachment && mediaAttachment.source_url && (
					<Image
						alt={mediaAttachment.alt_text}
						width={mediaAttachment.media_details.width}
						height={mediaAttachment.media_details.height}
						src={mediaAttachment.source_url}
						className={twMerge(mediaClassName, 'object-cover')}
					/>
				)}
			</Link>
			{tags && <Tags tags={tags} />}
			<Link
				href={link}
				className='mb-4 border-b border-solid border-cyan pb-4'
			>
				<Heading
					tag='h3'
					classLevel='h4'
					className='line-clamp-2 h-[2lh]'
					text={heading}
				/>
			</Link>
			<div
				className='line-clamp-3'
				dangerouslySetInnerHTML={{ __html: content }}
			></div>
		</motion.div>
	);
}
