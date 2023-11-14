'use client';
import { twMerge } from 'tailwind-merge';
import TextHeadline from './TextHeadline';
import Heading from './Heading';
import { miscClasses } from '@/lib/type';
import BackgroundVideo from './BackgroundVideo';
import Section from './Section';
import Image from 'next/image';
import Stats from './Stats';

interface CaseStudyProps {
	caseStudy: CaseStudy;
}

const statVariantClasses = {
	Text: {
		width: 'w-4/12',
		direction: 'flex-col',
		statsNumber:
			'font-extrabold text-[100px] leading-[34px] tracking-[0.03em] font-heading',
		statsUnit:
			'font-extrabold text-[70px] leading-[34px] tracking-[0.03em] font-heading',
		statsLabel:
			'font-extrabold text-[28px] leading-[34px] tracking-[0.03em] font-heading',
	},
};

export interface CaseStudy {
	category: string;
	title: string;
	header: string;
	media: any;
	sections: [
		{
			title: string;
			content: any;
		},
	];
	stats: {
		headlineStats: [
			{
				name: string;
				value: number;
				unit: string;
				skin: any;
			},
		];
		tableHeadline: string;
		tableStats: [
			{
				name: string;
				value: number;
			},
		];
	};
}

export default function CaseStudy({ caseStudy }: CaseStudyProps) {
	return (
		<Section className='bg-cream pt-40 md:pt-40'>
			<div className='flex w-full flex-col items-center'>
				<div className={twMerge(miscClasses['nav'], 'uppercase')}>
					<span className='font-extrabold'>Case Study: </span>
					<span className='text-red'>{caseStudy.title}</span>
				</div>
				<Heading
					tag='h1'
					text={caseStudy.header}
					className='pt-12'
				/>
			</div>
			<div
				className='relative my-20 h-[693px] w-full'
				// style={{ background: `url(${caseStudy.media.source_url})` }}
			>
				<BackgroundVideo src={caseStudy.media.source_url} />
			</div>

			{/* Sections */}
			<div className='grid grid-cols-2 gap-y-[120px]'>
				{caseStudy.sections.map((section: any, key: number) => (
					<div
						key={key}
						className='
					[&:first-child]:mr-[102px]
					[&:not(:nth-child(1),:nth-child(2))>:first-child]:min-w-[304px] 
					[&:not(:nth-child(1),:nth-child(2))]:col-span-2 [&:not(:nth-child(1),:nth-child(2))]:flex [&:not(:nth-child(1),:nth-child(2))]:flex-row 
					[&:nth-child(2)>.wysiwyg]:columns-2'
					>
						<TextHeadline
							heading={section.title}
							subHeading={`0${key + 1}`}
							className='pb-8'
						/>
						<div
							key={'casestudysection' + key}
							className='wysiwyg 
							[&>:is(h1,h2,h3,h4,h5,h6)]:mb-6 
							[&>:is(img)]:my-10'
							dangerouslySetInnerHTML={{ __html: section.content }}
						></div>
					</div>
				))}
			</div>

			{/* Stats Info */}
			<Stats
				stats={caseStudy.stats.headlineStats}
				skin='case-study'
			/>

			<div className='ml-[304px] flex flex-row flex-wrap items-end justify-between pt-[88px]'>
				<div className='w-full pb-8 font-heading text-[27px] font-extrabold leading-[34px] tracking-[0.03em]'>
					{caseStudy.stats.tableHeadline}
				</div>
				<div className='w-full'>
					{caseStudy.stats.tableStats.map((tStat: any, key: number) => (
						<div
							key={key}
							className='pb-6'
						>
							<div className='relative h-3 w-full bg-white'>
								<div className='absolute left-1/2 top-0 flex translate-y-[-80%] flex-col font-heading text-[10px] font-extrabold leading-[34px] tracking-[0.03em] text-red'>
									Up {tStat.value}%
								</div>
								<div
									className='h-full bg-red'
									style={{ width: `${tStat.value}%` }}
								></div>
							</div>
							<div className='text-10 font-heading font-[350] tracking-[0.03em]'>
								{tStat.name}
							</div>
						</div>
					))}
				</div>
			</div>
		</Section>
	);
}
