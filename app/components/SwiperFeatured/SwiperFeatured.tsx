'use client';
import { textClasses, miscClasses } from '@/lib/type';
import { twMerge } from 'tailwind-merge';
import Button from '@/components/Button';
import Link from 'next/link';
import './SwiperFeatured.css';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import { useState } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Controller } from 'swiper/modules';
import Heading from '../Heading';
import { WP_EMBED__Media_Detail } from '@/types/WP_EMBED__Media_Details';

interface SwiperFeaturedProps {
	slides: Slides;
}

export interface Slide {
	mediaDetail: WP_EMBED__Media_Detail | false;
	agencyCategory: string;
	postTitle: string;
	postUrl: string;
}
export interface Slides {
	heading: string;
	slides: Slide[];
	buttonText: string;
}

export default function SwiperFeatured({ slides }: SwiperFeaturedProps) {
	const [firstSwiper, setFirstSwiper] = useState<SwiperType | null>(null);
	const [secondSwiper, setSecondSwiper] = useState<SwiperType | null>(null);

	return (
		<div className='flex flex-col bg-navy md:flex-row'>
			<Swiper
				modules={[Controller]}
				onSwiper={(swiper) => {
					setFirstSwiper(swiper);
				}}
				controller={secondSwiper ? { control: secondSwiper } : undefined}
				className='w-full md:w-[57%]'
			>
				{slides.slides.map((item: Slide, key: number) => (
					<SwiperSlide key={'swiperfeaturedimage' + key}>
						<Link
							className='flex h-full flex-col text-cream md:flex-row md:pb-0 md:pl-0 md:pr-0 md:pt-0'
							href={item.postUrl || '/'}
						>
							{item.mediaDetail && (
								<div
									className='min-h-[--swiper-image-height-mobile] w-full bg-cover bg-left  bg-no-repeat md:bg-center'
									style={{
										backgroundImage: `url(${
											item.mediaDetail.source_url || 'no_image'
										})`,
									}}
								/>
							)}
						</Link>
					</SwiperSlide>
				))}
			</Swiper>
			<Swiper
				onSwiper={(swiper) => {
					setSecondSwiper(swiper);
				}}
				controller={firstSwiper ? { control: firstSwiper } : undefined}
				modules={[Pagination, Controller]}
				pagination={{ clickable: true }}
				className='featured-items-slider w-full md:w-[43%]'
			>
				{slides.slides.map((item: Slide, key: any) => (
					<SwiperSlide
						key={'swiperfeaturedcontent' + key}
						className='mb-12 flex flex-col items-stretch'
					>
						<div className='flex h-full flex-col text-cream md:flex-row md:pb-0 md:pl-0 md:pr-0 md:pt-0'>
							<div className='mx-auto flex min-h-[352px] w-[var(--swiper-content-width-mobile)] flex-col md:w-[var(--swiper-content-width)]'>
								<div
									className={twMerge(
										miscClasses['nav'],
										'pb-6 pt-32 text-center uppercase md:pb-7 md:pt-12 md:font-[350]'
									)}
								>
									{slides.heading}
								</div>
								<div className='flex h-[auto] flex-grow flex-col items-center justify-start text-center md:pt-[88px]'>
									<div className='flex flex-grow flex-col justify-center'>
										<div
											className={twMerge(
												textClasses['micro'],
												'hidden pb-6 md:block'
											)}
										>
											{item.agencyCategory}
										</div>
										<Heading
											tag='h2'
											classLevel='h1'
											text={item.postTitle}
											className='text-white'
										/>
									</div>
									<div className='mt-14 flex flex-grow flex-col justify-end justify-self-end md:pb-20'>
										<Button
											text={slides.buttonText}
											link={item.postUrl || '/'}
											variation='secondaryOutline'
											className='flex md:mt-0'
											size='small'
										></Button>
									</div>
								</div>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
