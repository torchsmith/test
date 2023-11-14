'use client';
import { twMerge } from 'tailwind-merge';
import Heading from './Heading';
import { motion } from 'framer-motion';

export interface TextHeadlineProps {
	heading: string;
	subHeading?: string;
	className?: string;
}

export default function TextHeadline({
	heading,
	subHeading,
	className,
}: TextHeadlineProps) {
	return (
		<div
			className={twMerge(
				'relative flex w-fit flex-shrink-0 flex-col md:min-w-fit',
				className
			)}
		>
			{subHeading && (
				<Heading
					className='absolute top-0 -translate-y-[100%] pb-1 text-cyan misc-nav-light'
					tag='h3'
					text={subHeading}
				/>
			)}
			<div>
				<motion.div
					className='h-[1px] bg-cyan'
					initial={{ width: 0 }}
					whileInView={{ width: '100%' }}
					transition={{ duration: 1 }}
				></motion.div>
				<Heading
					className={twMerge(
						'w-fit pt-4 uppercase misc-nav-light',
						subHeading && 'w-[192px]'
					)}
					tag='h2'
					text={heading}
				/>
			</div>
		</div>
	);
}
