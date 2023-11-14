'use client';
import { textClasses, miscClasses } from '@/lib/type';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import Image from 'next/image';
import './SwiperPostGrid.css';

import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
//@ts-ignore
import { Pagination } from 'swiper/modules';
import Heading from '../Heading';
import { space } from 'postcss/lib/list';
import Button from '../Button';
import { useId } from 'react';
import {
	WP_REST_API_Attachments,
	WP_REST_API_Post,
	WP_REST_API_Posts,
} from 'wp-types';
import { WP_EMBED__Media_Detail } from '@/types/WP_EMBED__Media_Details';
import { React_Image } from '@/types/React__Image';

interface SwiperPostGridProps {
	posts: WP_REST_API_Posts;
	featuredMedias: React_Image[];
}

const SwiperPostGrid: React.FC<SwiperPostGridProps> = ({
	posts,
	featuredMedias,
}) => {
	const id = useId();
	const mediaClasses =
		'min-h-[237px] xl:flex-shrink-[2] xl:max-w-[400px] max-h-[225px] object-cover xl:self-center';
	const textGroupCol = '[&>div>div]:flex-col xl:[&>div>div]:max-w-[400px]';

	return (
		<>
			<Swiper
				slidesPerView={'auto'}
				freeMode={true}
				pagination={{ clickable: true }}
				modules={[Pagination]}
				spaceBetween={24}
				breakpoints={{
					768: {
						spaceBetween: 16,
					},
				}}
				className='post-grid-slider relative !pb-10 xl:max-h-[544px] xl:!pb-[unset]'
			>
				{posts &&
					posts.map((post: WP_REST_API_Post, key: number) => {
						const featuredMedia = featuredMedias[key];
						if (!featuredMedia) {
							return null;
						}

						return (
							<SwiperSlide
								key={id + key}
								className='!w-[282px] md:!w-[400px]'
							>
								{/* Posts */}
								<div
									key={id + 'post' + key}
									className='flex flex-col'
								>
									<div className='mb-10'>
										<Image
											alt={featuredMedia.alt}
											width={featuredMedia.width}
											height={featuredMedia.height}
											src={featuredMedia.src}
											className={twMerge(mediaClasses)}
										/>
										{/* // <video
												// 	controls
												// 	loop
												// 	muted
												// 	className={twMerge(mediaClasses, 'object-cover')}
												// >
												// 	<source
												// 		src={featuredMedias[key].source_url}
												// 		type='video/mp4'
												// 	></source>
												// </video> */}
									</div>
									<Link
										href={'/insights/' + post.slug}
										className='mb-4 border-b border-solid border-cyan pb-4'
									>
										<Heading
											tag='h3'
											classLevel='h4'
											className='line-clamp-2 h-[2lh]'
											text={post.title['rendered']}
										/>
									</Link>
									<div
										dangerouslySetInnerHTML={{
											__html: post.excerpt['rendered'],
										}}
									></div>
								</div>
							</SwiperSlide>
						);
					})}
			</Swiper>
			<Button
				className='mx-auto mt-20 w-fit xl:flex'
				size='medium'
				text='Explore Insights'
				link='/insights'
			/>
		</>
	);
};

export default SwiperPostGrid;
