'use client';
import { twMerge } from 'tailwind-merge';
import { chunkArray } from '@/lib/utilities';
import './SwiperLogo.css';
import Image from 'next/image';
import { WP_EMBED__Attachment } from '@/types/WP_EMBED__Attachment';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
interface SwiperLogoProps {
	images: WP_EMBED__Attachment[];
}

function SwiperLogo(props: SwiperLogoProps) {
	// console.log(JSON.stringify({ props }));
	const { images } = props;
	console.log('SwiperLogo images', images.length);

	// if (images.length === 0) {
	// 	return <div></div>;
	// }

	const chunkedImages: WP_EMBED__Attachment[][] = chunkArray(images, 4);

	// console.log('SwiperLogo chunkedImages', chunkedImages.length);
	// Check for identity image
	// if (!chunkedImages[0][0]) {
	// 	return <div></div>;
	// }

	return (
		<Swiper
			pagination={{ clickable: true }}
			modules={[Pagination]}
			className={twMerge('logo-slider relative bg-navy [&>div]:items-center')}
		>
			{/* <pre>{JSON.stringify(chunkedImages, null, 2)}</pre> */}

			{chunkedImages.map(
				(slide: WP_EMBED__Attachment[], index: number) =>
					// check for ID image
					slide[0] && (
						<SwiperSlide
							key={slide[0].id + 'slide' + index}
							className='w-100% flex items-center px-4 pb-10 pt-[120px] md:min-h-[333px] md:px-8'
						>
							<div
								className={twMerge(
									'mx-auto flex max-w-page flex-row flex-wrap justify-evenly gap-[104px] pb-20'
								)}
							>
								{slide.map(
									(image: WP_EMBED__Attachment, index: number) =>
										image && (
											<Image
												key={image.id + 'images' + index}
												className='h-auto max-w-[149px] md:max-w-[189px]'
												alt={image.alt}
												width={image.width}
												height={image.height}
												src={image.url}
											/>
										)
								)}
							</div>
						</SwiperSlide>
					)
			)}
		</Swiper>
	);
}

export default SwiperLogo;
