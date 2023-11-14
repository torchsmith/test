import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import { WP_ACF_Widget__Stats } from '@/types/WP_ACF_Widget__Stats';
import React from 'react';

export const Skins = {
	'': '',
	'case-study': 'case-study',
} as const;

interface StatsProps {
	stats: WP_ACF_Widget__Stats[];
	skin?: (typeof Skins)[keyof typeof Skins];
}

export default function Stats({ stats, skin = '' }: StatsProps) {
	return (
		<div
			className={twMerge(
				'flex flex-col flex-wrap items-center justify-center gap-y-10 md:ml-[278px] md:flex-row md:items-end md:justify-around md:gap-10',
				skin == 'case-study' && 'pt-[88px]',
				'[&>div:not(:first-child)]'
			)}
		>
			{stats.map(
				(stat: WP_ACF_Widget__Stats, key: number) =>
					stat && (
						<React.Fragment key={'stat' + key}>
							{stat.skin == 'Hexagon' && (
								<div
									// key={'hex-stat' + key}
									className={twMerge(
										'flex max-w-[50%] flex-row items-center gap-6',
										skin == 'case-study' && 'pb-36'
									)}
								>
									<div className='relative'>
										<Image
											src='/media/hexagon.svg'
											height={112}
											width={132}
											alt='hexagon backdrop'
										/>
										<div className='absolute inset-0 flex items-center justify-center text-red'>
											<span
												className={twMerge(
													'inline-block font-heading text-[56px] font-extrabold leading-[34px] tracking-[0.03em]'
												)}
											>
												{stat.value}
											</span>
											<span
												className={twMerge(
													'inline-block font-heading text-[40px] font-extrabold leading-[34px] tracking-[0.03em]'
												)}
											>
												{stat.unit}
											</span>
										</div>
									</div>

									<div
										className={twMerge(
											'font-heading text-[27px] font-extrabold leading-[34px] tracking-[0.03em]'
										)}
									>
										{stat.name}
									</div>
								</div>
							)}
							{stat.skin == 'Text' && (
								<div
									// key={'text-stat' + key}
									className={twMerge(
										'flex  w-[fit-content] flex-col items-center pt-[20px]',
										skin == 'case-study' && 'pb-36'
									)}
								>
									<div className='text-red'>
										<span
											className={twMerge(
												'inline-block font-heading text-[100px] font-extrabold leading-[34px] tracking-[0.03em]'
											)}
										>
											{stat.value}
										</span>
										<span
											className={twMerge(
												'inline-block font-heading text-[70px] font-extrabold leading-[34px] tracking-[0.03em]'
											)}
										>
											{stat.unit}
										</span>
									</div>
									<div
										className={twMerge(
											'font-heading text-[28px] font-extrabold leading-[34px] tracking-[0.03em]'
										)}
									>
										{stat.name}
									</div>
								</div>
							)}
						</React.Fragment>
					)
			)}
		</div>
	);
}
