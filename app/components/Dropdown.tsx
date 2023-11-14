'use client';
import Link from 'next/link';
import Image from 'next/image';
// import styles from './Dropdown.module.css';
import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface DropdownProps {
	href?: string;
	heading?: string;
	maxHeight?: string;
	className?: string;
	classNameUl?: string;
	children?: React.ReactNode | React.ReactNode[];
}

const dropdownIconWidth = 17; //px

export default function Dropdown({
	href = '#',
	heading = 'Dropdown Heading',
	maxHeight = '174px',
	className = '',
	classNameUl = '',
	children,
}: DropdownProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [aniComplete, setAniState] = useState(0);

	const handleMenuToggle = (e: any) => {
		e.preventDefault();
		// @ts-ignore
		e.target.classList.toggle('active');
		setIsOpen(!isOpen);
	};

	return (
		<div
			className={twMerge(
				`dropdown relative `,
				className,
				isOpen ? `open` : `closed`
			)}
			onClick={(e) => {
				// handleMenuToggle(e);
				// setAniState(1);
			}}
			onAnimationEnd={() => setAniState(0)}
			// @ts-ignore aniComplete is targeting the html data element, our animation marker
			anicomplete={aniComplete}
		>
			<Image
				src='/media/dropdown-icon.svg'
				height={dropdownIconWidth}
				width={dropdownIconWidth}
				alt='Logo'
				// Won't compile variable
				// className={twMerge("absolute inset-y-0", "left-[" + (-5 - dropdownIconWidth).toString() +"px]" )}
				className={twMerge('absolute inset-y-0', 'left-[-24px] md:hidden')}
				onClick={(e) => {
					handleMenuToggle(e);
					setAniState(1);
				}}
			/>
			<Link href={href}>{heading}</Link>
			<ul
				className={twMerge(
					'text-nunito gap-block-xxs pt-block-xxs grid grid-cols-1 text-[12px]',
					classNameUl
				)}
			>
				{children}
			</ul>
			<style jsx>{`
				@keyframes expandCollapse {
					0% {
						opacity: 0;
						/* margin-top: -100%; */
						max-height: 0;
						/* transform: scaleY(0); */
						/* grid-auto-rows: 0; */
						/* gap: 0; */
						/* padding-top: 0; */
						/* padding-bottom: 0; */
					}
					66% {
						opacity: 0;
					}
					100% {
						opacity: 1;
						/* margin-top: 0; */
						max-height: ${maxHeight};
						/* transform: scaleY(1); */
						/* grid-auto-rows: 1fr; */
						/* gap: 12px; */
						/* padding-top: 12px; */
						/* padding-bottom: 0; */
					}
				}

				.dropdown[anicomplete='1'] > ul {
					animation: expandCollapse 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)
						forwards;
				}

				.dropdown > img {
					transition: transform 0.5s ease-in-out;
				}

				.closed > ul {
					animation-direction: reverse !important;
					opacity: 0;
					/* margin-top: -100%; */
					max-height: 0;
					/* transform: scaleY(0); */
					/* grid-auto-rows: 0; */
					/* gap: 0; */
					/* padding-top: 0; */
					/* padding-bottom: 0; */
					pointer-events: none;
				}

				.open > ul {
					opacity: 1;
					/* margin-top: 0; */
					max-height: ${maxHeight};
					/* transform: scaleY(1); */
					/* grid-auto-rows: 1fr; */
					pointer-events: auto;
				}
				.open > img {
					transform: rotate(180deg);
				}
			`}</style>
		</div>
	);
}
