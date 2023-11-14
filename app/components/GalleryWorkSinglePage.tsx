'use client';
import { twMerge } from 'tailwind-merge';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useId } from 'react';
import { React_Image } from '@/types/React__Image';

interface GalleryWorkSinglePageProps {
	images: React_Image[];
}

export default function GalleryWorkSinglePage({
	images,
}: GalleryWorkSinglePageProps) {
	const id = 'grid-' + useId().replaceAll(':', '');
	const grid = useRef(null);

	useEffect(() => {
		if (window === undefined || window === null || grid.current === null)
			return;
		async function loadMasonry() {
			if (grid.current === null) return;

			const Masonry = (await import('masonry-layout')).default;
			const ImagesLoaded = (await import('imagesloaded')).default;

			const masonry = new Masonry(grid.current, {
				itemSelector: `.grid-item-${id}`,
				columnWidth: `.grid-sizer-${id}`,
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

	// useEffect(() => {
	// 	let grid = document.querySelector(`.${id}`);

	// 	var msnry = new Masonry(grid, {
	// 		itemSelector: `.grid-item-${id}`,
	// 		columnWidth: `.grid-sizer-${id}`,
	// 		gutter: 24,
	// 		percentPosition: true,
	// 	});

	// 	imagesLoaded(grid).on('imagesLoaded', function () {
	// 		// layout Masonry after each image loads
	// 		msnry.layout();
	// 	});
	// }, []);

	// 100/colNum - (gutter)
	let columnWidth = 'w-[calc(100%/var(--col-amt)-calc(24px))]';

	return (
		<div
			ref={grid}
			className={twMerge(id, '-mb-8')}
		>
			<style>
				{`
					.${id}{
					--col-amt: 1;
				}
				@media (max-width: 1240px) {
					.${id}{
						--col-amt: 2;
					}
				}
				@media (max-width: 767px) {
					.${id}{
						--col-amt: 1;
					}
				}
				`}
			</style>
			<div
				className={twMerge(`grid-sizer-${id} pointer-events-none`, columnWidth)}
			></div>
			{images.map((image: React_Image, key: number) => {
				return (
					<div
						key={'gallery-item-' + key}
						className={twMerge(`grid-item-${id}`, 'relative mb-8', columnWidth)}
					>
						{image && (
							<Image
								alt={image.alt}
								width={image.width}
								height={image.height}
								src={image.src}
								className='mx-auto'
							/>
						)}
					</div>
				);
			})}
		</div>
	);
}
