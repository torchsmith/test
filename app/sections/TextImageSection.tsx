'use client';
import Section from '@/components/Section';
import TextGroup from '@/components/TextGoup';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { Bg } from '@/lib/acfFields';
import { motion } from 'framer-motion';
import { WP_ACF_Widget__Text_Group } from '@/types/WP_ACF_Widget__Text_Group';

const Skins = {
	MobileCentered: 'Mobile Centered',
} as const;

interface TextMediaSectionProps {
	acf: WP_ACF_Widget__Text_Group;
}

export default function TextMediaSection({ acf }: TextMediaSectionProps) {
	const video = acf.media.video ? acf.media.video : null;
	const image = acf.media.image ? acf.media.image : null;

	const mediaClasses =
		'min-h-[237px] xl:flex-shrink-[2] xl:max-w-[704px] max-h-[459px] object-cover xl:self-center';
	const textGroupCol = '[&>div>div]:flex-col xl:[&>div>div]:max-w-[400px]';
	return (
		<Section className={twMerge(Bg[acf.background])}>
			<motion.div
				// initial={{ opacity: 0, translateY: 10 }}
				// animate={{ opacity: 1, translateY: 0 }}
				className={twMerge(
					`flex flex-col-reverse justify-between xl:mt-0 xl:flex-shrink xl:flex-row`
				)}
			>
				<div className={twMerge('mt-12 self-center xl:mt-0', textGroupCol)}>
					<TextGroup
						acf={acf}
						sectionSpacing='40px'
					/>
				</div>
				{acf.media.media_type == 'Image'
					? image && (
							<Image
								alt={image.alt}
								width={image.width}
								height={image.height}
								src={image.url}
								className={twMerge(mediaClasses)}
							/>
					  )
					: // {acf.media.media_type == 'Video' && (
					  video && (
							<video
								autoPlay
								loop
								muted
								className={twMerge(mediaClasses)}
							>
								<source
									src={video.url}
									type='video/mp4'
								></source>
							</video>
					  )}
			</motion.div>
		</Section>
	);
}
