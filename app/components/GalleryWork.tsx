'use client';
import { twMerge } from 'tailwind-merge';
import { useEffect, useRef } from 'react';
import { decodeHtmlEntity } from '@/lib/utilities';
import Image from 'next/image';
import { headingClasses, textClasses } from '@/lib/type';
import Link from 'next/link';
import { WP_ACF_Post__Work } from '@/types/WP_ACF_Post__Work';
import { WP_EMBED__Attachment } from '@/types/WP_EMBED__Attachment';
import { React_Image } from '@/types/React__Image';

export interface WorkCard {
	title: string;
	slug: string;
	industry: string;
	image: React_Image;
}

interface GalleryWorkProps {
	workCards: WorkCard[];
}

export default function GalleryWork({ workCards }: GalleryWorkProps) {
	const grid = useRef(null);

	useEffect(() => {
		if (window === undefined || window === null || grid.current === null)
			return;
		async function loadMasonry() {
			if (grid.current === null) return;
			const Masonry = (await import('masonry-layout')).default;
			const ImagesLoaded = (await import('imagesloaded')).default;

			const masonry = new Masonry(grid.current, {
				itemSelector: '.grid-item',
				columnWidth: '.grid-sizer',
				gutter: 24,
				percentPosition: true,
			});

			ImagesLoaded(grid.current).on('imagesLoaded', function () {
				// layout Masonry after each image loads
				if (
					masonry === undefined ||
					masonry === null ||
					masonry.layout === undefined
				)
					return;

				masonry.layout();
			});
		}
		loadMasonry();
	}, [grid]);

	// 100/colNum - (gutter)
	let columnWidth = 'w-[calc(100%/var(--col-amt)-calc(24px))]';

	return (
		<div
			ref={grid}
			className={twMerge('grid', '-mb-8')}
		>
			<style>
				{`
				.grid{
					--col-amt: 3;
				}
				@media (max-width: 1240px) {
					.grid{
						--col-amt: 2;
					}
				}
				@media (max-width: 767px) {
					.grid{
						--col-amt: 1;
					}
				}
				`}
			</style>
			<div
				className={twMerge('grid-sizer pointer-events-none', columnWidth)}
			></div>
			{workCards.map((workCard: WorkCard, key: number) => {
				return (
					<div
						key={'gallery-item-' + key}
						className={twMerge('grid-item', 'relative mb-8', columnWidth)}
					>
						<Link
							href={`/work/${workCard.slug}`}
							className='flex justify-center self-center'
						>
							{workCard.image && (
								<Image
									alt={workCard.image.alt}
									width={workCard.image.width}
									height={workCard.image.height}
									src={workCard.image.src}
								/>
							)}
							<div className='absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-4 bg-white bg-opacity-80 text-center text-red opacity-0 transition-all hover:opacity-100'>
								<div
									className={twMerge(
										headingClasses['h3'],
										'pointer-events-auto'
									)}
								>
									{decodeHtmlEntity(workCard.title)}
								</div>
								<div
									className={twMerge(
										textClasses['micro'],
										'pointer-events-auto'
									)}
								>
									{decodeHtmlEntity(workCard.industry)}
								</div>
							</div>
						</Link>
					</div>
				);
			})}
		</div>
	);
}
