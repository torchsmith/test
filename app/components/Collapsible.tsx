'use client';
import Image from 'next/image';
// import styles from './Dropdown.module.css';
import Heading from './Heading';
import React, { useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { headingClasses, miscClasses } from '@/lib/type';

const variationClasses = {
	default: {
		imagesrc: '/media/next-prev-button.svg',
	},
	scheduleForm: {
		imagesrc: '/media/v5-icon.svg',
	},
};

interface CollapsibleProps {
	heading: string;
	className?: string;
	classNameUl?: string;
	children?: React.ReactNode | React.ReactNode[];
	variation?: keyof typeof variationClasses;
}

const dropdownIconWidth = 17; //px

export default function Collapsible({
	heading = 'Click Me',
	className = '',
	children,
	variation = 'default',
}: CollapsibleProps) {
	const [isOpen, setIsOpen] = useState(false);
	const collaspible = useRef<HTMLDivElement>(null);

	const handleMenuToggle = (e: any) => {
		e.target.classList.toggle('active');
		isOpen
			? collaspible.current?.setAttribute(`style`, `height:0px;`)
			: collaspible.current?.setAttribute(
					`style`,
					`height:${collaspible.current.scrollHeight}px;`
			  );

		setIsOpen(!isOpen);
	};

	return (
		<div
			className={twMerge(
				`collapsible-parent mb-10 w-full`,
				className,
				isOpen ? `open` : `closed`
			)}
		>
			<div
				className={twMerge(
					'relative cursor-pointer',
					variation == 'scheduleForm' && 'mx-auto w-fit'
				)}
				onClick={(e) => {
					handleMenuToggle(e);
				}}
			>
				<Image
					src={twMerge(variationClasses[variation].imagesrc)}
					height={40}
					width={40}
					alt='Logo'
					className={twMerge(
						'absolute -right-[56px] top-1/2 origin-center -translate-y-1/2 transform transition-all ',
						variation == 'default' &&
							(isOpen ? 'rotate-90' : 'rotate-[270deg]'),
						variation == 'scheduleForm' && '-right-[32px] h-[24px] w-[24px]',
						variation == 'scheduleForm' && isOpen ? 'rotate-180' : ''
					)}
					onClick={(e) => {
						handleMenuToggle(e);
					}}
				/>
				<Heading
					tag='h3'
					text={heading}
					classLevel=''
					className={twMerge(
						variation == 'default' && headingClasses['h3'],
						variation == 'scheduleForm' &&
							'w-fit text-center uppercase text-red md:w-fit ' +
								miscClasses['nav'],
						isOpen && variation == 'scheduleForm' && 'text-grey-40'
					)}
				/>
			</div>
			<div
				ref={collaspible}
				className={twMerge(
					'collapsible h-0 overflow-hidden transition-all',
					isOpen ? 'opacity-1 mt-4' : 'opcaity-0'
				)}
			>
				{children}
			</div>
		</div>
	);
}
