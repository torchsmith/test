import Section from '@/components/Section';
import TextGroup from '@/components/TextGoup';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { Bg } from '@/lib/acfFields';
import { WP_EMBED__Attachment } from '@/types/WP_EMBED__Attachment';
import { WP_ACF_Widget__Text_Group } from '@/types/WP_ACF_Widget__Text_Group';

const Skins = {
	MobileCentered: 'Mobile Centered',
} as const;

interface TextTwoMediaSectionProps {
	acf: WP_ACF_Widget__Text_Group & {
		media_side: {
			media_type_side: string;
			image_side: WP_EMBED__Attachment;
			video_side: WP_EMBED__Attachment;
		};
		media_top: {
			media_type: string;
			image: WP_EMBED__Attachment;
			video: WP_EMBED__Attachment;
		};
	};
}

export default async function TextTwoMediaSection({
	acf,
}: TextTwoMediaSectionProps) {
	const side =
		acf.media_side.media_type_side == 'Video'
			? acf.media_side.video_side
			: acf.media_side.image_side;
	const top =
		acf.media_top.media_type == 'Video'
			? acf.media_top.video
			: acf.media_top.image;

	const mediaClasses = 'xl:flex-shrink-[2] object-cover xl:self-center';
	return (
		<Section className={twMerge(Bg[acf.background])}>
			<div
				className={twMerge(
					`flex flex-col justify-between gap-7 sm:flex-row xl:mt-0 xl:flex-shrink xl:gap-14`
				)}
			>
				<div
					className={twMerge(
						'flex h-full flex-col gap-6 xl:mt-0 xl:gap-[72px]'
					)}
				>
					{acf.media_top.media_type == 'Image' && top && (
						<Image
							alt={top.alt}
							width={top.width}
							height={top.height}
							src={top.url}
							className={twMerge(mediaClasses)}
						/>
					)}
					{acf.media_top.media_type == 'Video' && top && (
						<video
							autoPlay
							loop
							muted
							className={twMerge(mediaClasses)}
						>
							<source
								src={top.url}
								type='video/mp4'
							></source>
						</video>
					)}
					<TextGroup
						acf={acf}
						sectionSpacing='40px'
					/>
				</div>
				{acf.media_side.media_type_side == 'Image' && side && (
					<Image
						alt={side.alt}
						width={side.width}
						height={side.height}
						src={side.url}
						className={twMerge(mediaClasses, 'sm:max-w-[37%]')}
					/>
				)}
				{acf.media_side.media_type_side == 'Video' && side && (
					<video
						autoPlay
						loop
						muted
						className={twMerge(mediaClasses, 'sm:max-w-[37%]')}
					>
						<source
							src={side.url}
							type='video/mp4'
						></source>
					</video>
				)}
			</div>
		</Section>
	);
}
