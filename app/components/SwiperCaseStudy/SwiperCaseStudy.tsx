'use client';
import { textClasses, miscClasses } from '@/lib/type';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import Image from 'next/image';
import './SwiperCaseStudy.css';

import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Heading from '../Heading';
import { space } from 'postcss/lib/list';
import CaseStudy, { CaseStudy as CaseStudyType } from '../CaseStudy';

interface SwiperCaseStudyProps {
	caseStudies: CaseStudyType[];
}

export default function SwiperCaseStudy({ caseStudies }: SwiperCaseStudyProps) {
	const mediaClasses =
		'min-h-[237px] xl:flex-shrink-[2] xl:max-w-[400px] max-h-[225px] object-cover xl:self-center';
	const textGroupCol = '[&>div>div]:flex-col xl:[&>div>div]:max-w-[400px]';
	return (
		<Swiper
			slidesPerView={1}
			pagination={{
				clickable: true,
				renderBullet: function (index, className) {
					return (
						'<div class="' +
						className +
						'"> <div>' +
						caseStudies[index].title +
						'</div> </div>'
					);
				},
			}}
			modules={[Pagination]}
			className='case-study-slider relative'
		>
			{caseStudies &&
				caseStudies.map((caseStudy: CaseStudyType, key: number) => (
					<SwiperSlide key={'casestudyslide' + key}>
						<CaseStudy caseStudy={caseStudy}></CaseStudy>
					</SwiperSlide>
				))}
		</Swiper>
	);
}
