'use client';
import { hex2rgb } from '@/lib/utilities';
import Link from 'next/link';
import { MouseEventHandler } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps {
	text: string;
	link?: string;
	variation?: keyof typeof variationClasses;
	size?: keyof typeof sizeClasses;
	className?: string;
	isButton?: boolean;
	onclick?: MouseEventHandler<HTMLButtonElement>;
}

export const sizeClasses = {
	letschat: 'px-6 py-4 lg:px-4 lg:py-9', // Lets Chat
	small: 'px-8 py-4', //Swiper
	'medium short': 'px-9 py-5', //Swiper
	medium: 'px-9 py-6', // Button Section
	'large short': 'px-10 py-4', // Text Group
	nav: 'px-10 py-6', // Button Nav
};

const variationClasses: {
	[key: string]: {
		text: string;
		bg: string;
		bgHover: string;
		color: string;
	};
} = {
	primary: {
		text: 'text-red',
		bg: hex2rgb('#f3f2ed'),
		bgHover: hex2rgb('#f23b3d', 0.1),
		color: hex2rgb('#f23b3d'),
	},
	primaryFill: {
		text: 'text-cream',
		bg: hex2rgb('#f23b3d'),
		bgHover: hex2rgb('#f23b3d', 0.1),
		color: hex2rgb('#f23b3d'),
	},
	primaryOutline: {
		text: 'text-red',
		bg: 'none',
		bgHover: hex2rgb('#f23b3d', 0.075),
		color: hex2rgb('#f23b3d'),
	},
	secondary: {
		text: 'text-cream',
		bg: hex2rgb('#f23b3d'),
		bgHover: hex2rgb('#f3f2ed'),
		color: hex2rgb('#f3f2ed'),
	},
	secondaryOutline: {
		text: 'text-cream',
		bg: 'none',
		bgHover: hex2rgb('#f3f2ed', 0.075),
		color: hex2rgb('#f3f2ed'),
	},
	tertiaryOutline: {
		text: 'text-navy',
		bg: 'none',
		bgHover: hex2rgb('#2f3f54', 0.075),
		color: hex2rgb('#2f3f54'),
	},
	quaternaryOutline: {
		text: 'text-yellow',
		bg: 'none',
		bgHover: hex2rgb('#f2b807', 0.075),
		color: hex2rgb('#f2b807'),
	},
	quinaryOutline: {
		text: 'text-cyan',
		bg: 'none',
		bgHover: hex2rgb('#4DC8EE', 0.075),
		color: hex2rgb('#4DC8EE'),
	},
};

const Button: React.FC<ButtonProps> = ({
	text,
	link,
	variation = 'primaryOutline',
	size = 'medium',
	className = '',
	isButton = false,
}) => {
	const borderImageWidth = '50%'; //splits the image in two
	const borderImageHeight = '50%';

	const buttonInternal = (
		<>
			<div
				className={twMerge(
					'flex h-full w-fit items-center text-center',
					sizeClasses[size],
					variationClasses[variation].text
				)}
				style={{
					borderImageSource: `url('data:image/svg+xml;utf8,<svg width="212" height="56" viewBox="0 0 212 56" fill="none" xmlns="http://www.w3.org/2000/svg"><style>svg path{fill:${variationClasses[variation].bg}}</style> <path d="M193.458 1C195.247 1 196.917 1.97 197.798 3.52L210.337 25.52C211.207 27.05 211.207 28.94 210.337 30.47L197.798 52.47C196.908 54.03 195.247 54.99 193.458 54.99H18.5375C16.7475 54.99 15.0775 54.02 14.1975 52.47L1.6575 30.48C0.7875 28.95 0.7875 27.06 1.6575 25.53L14.1975 3.52C15.0875 1.96 16.7475 1 18.5375 1H193.458Z" stroke="${variationClasses[variation].color}"/></svg>')`,
					borderImageWidth: `${borderImageHeight} ${borderImageWidth}`,
					borderImageSlice: `${borderImageHeight} ${borderImageWidth}`,
					borderImageRepeat: 'stretch',
				}}
			>
				{text}
			</div>

			<div
				className={twMerge(
					'absolute flex h-full w-fit items-center text-center opacity-0 transition-opacity group-hover:opacity-100',
					sizeClasses[size],
					variationClasses[variation].text
				)}
				aria-hidden
				style={{
					borderImageSource: `url('data:image/svg+xml;utf8,<svg width="212" height="56" viewBox="0 0 212 56" fill="none" xmlns="http://www.w3.org/2000/svg"><style>svg path{fill:${variationClasses[variation].bgHover}}</style> <path d="M193.458 1C195.247 1 196.917 1.97 197.798 3.52L210.337 25.52C211.207 27.05 211.207 28.94 210.337 30.47L197.798 52.47C196.908 54.03 195.247 54.99 193.458 54.99H18.5375C16.7475 54.99 15.0775 54.02 14.1975 52.47L1.6575 30.48C0.7875 28.95 0.7875 27.06 1.6575 25.53L14.1975 3.52C15.0875 1.96 16.7475 1 18.5375 1H193.458Z" stroke="${variationClasses[variation].color}"/></svg>')`,
					borderImageWidth: `${borderImageHeight} ${borderImageWidth}`,
					borderImageSlice: `${borderImageHeight} ${borderImageWidth}`,
					borderImageRepeat: 'stretch',
				}}
			>
				{text}
			</div>
		</>
	);

	const wrapperClasses = twMerge(
		'group relative flex h-fit flex-row justify-center font-heading font-medium uppercase tracking-button text-red',
		className
	);

	return (
		<>
			{isButton ? (
				<button className={wrapperClasses}>{buttonInternal}</button>
			) : (
				<Link
					href={link || '#'}
					className={wrapperClasses}
				>
					{buttonInternal}
				</Link>
			)}
		</>
	);
};

export default Button;

// IF STRETCHING OF BUTTON ENDCAPS BECOMES A PROBLEM USE THE BELOW SETUP

// 'use client';
// import { hex2rgb } from '@/lib/utilities';
// import Link from 'next/link';
// import { MouseEventHandler } from 'react';
// import { twMerge } from 'tailwind-merge';

// interface ButtonProps {
// 	text: string;
// 	link: string;
// 	variation?: keyof typeof variationClasses;
// 	size?: keyof typeof sizeClasses;
// 	className?: string;
// 	innerBg?: string;
// 	innerFill?: string;
// 	isButton?: boolean;
// 	onclick?: MouseEventHandler<HTMLButtonElement>;
// }

// export const sizeClasses = {
// 	letschat: 'px-6 py-4 lg:px-4 lg:py-9', // Lets Chat
// 	small: 'px-8 py-4', //Swiper
// 	'medium short': 'px-9 py-5', //Swiper
// 	medium: 'px-9 py-6', // Button Section
// 	'large short': 'px-10 py-4', // Text Group
// 	nav: 'px-10 py-6', // Button Nav
// };

// const variationClasses: any = {
// 	primary: {
// 		text: 'text-red',
// 		bg: 'bg-cream',
// 		fill: 'fill-cream',
// 		outline: 'bg-red',
// 		outlineFill: 'fill-red',
// 	},
// 	primaryFill: {
// 		text: 'text-cream',
// 		bg: 'bg-red',
// 		outline: 'bg-red',
// 		outlineFill: 'fill-red',
// 	},
// 	primaryOutline: {
// 		text: 'text-red',
// 		bg: false,
// 		outline: 'bg-red',
// 		outlineFill: 'fill-red',
// 	},
// 	secondary: {
// 		text: 'text-cream',
// 		bg: 'bg-red',
// 		outline: 'bg-cream',
// 		outlineFill: 'fill-cream',
// 	},
// 	secondaryOutline: {
// 		text: 'text-cream',
// 		bg: false,
// 		outline: 'bg-cream',
// 		outlineFill: 'fill-cream',
// 	},
// 	tertiaryOutline: {
// 		text: 'text-navy',
// 		bg: false,
// 		outline: 'bg-dark-cyan',
// 		outlineFill: 'fill-dark-cyan',
// 	},
// 	quaternaryOutline: {
// 		text: 'text-yellow',
// 		bg: false,
// 		outline: 'bg-yellow',
// 		outlineFill: 'fill-yellow',
// 	},
// 	quinaryOutline: {
// 		text: 'text-cyan',
// 		bg: false,
// 		outline: 'bg-cyan',
// 		outlineFill: 'fill-cyan',
// 	},
// };

// const Button: React.FC<ButtonProps> = ({
// 	text,
// 	link,
// 	variation = 'primaryOutline',
// 	size = 'medium',
// 	className = '',
// 	innerBg = '',
// 	innerFill = '',
// 	isButton = false,
// }) => {
// 	const innerButton = (
// 		<>
// 			{/* button outline */}
// 			{variationClasses[variation].bg === false && (
// 				<div
// 					className={`absolute -top-[1px] left-[17px] h-[calc(100%+2px)] w-[calc(100%-34px)] ${variationClasses[variation].outline}`}
// 				>
// 					<svg
// 						width='19'
// 						viewBox='0 0 19 56'
// 						fill='none'
// 						xmlns='http://www.w3.org/2000/svg'
// 						className='absolute right-[calc(100%-1px)] top-0 h-full'
// 						preserveAspectRatio='none'
// 					>
// 						<path
// 							d='M13.3275 3.03C14.3875 1.16 16.3775 0 18.5375 0V56C16.3875 56 14.3975 54.84 13.3275 52.97L0.7875 30.97C-0.2625 29.13 -0.2625 26.87 0.7875 25.03L13.3275 3.03Z'
// 							className={variationClasses[variation].outlineFill}
// 						/>
// 					</svg>
// 					<span className={twMerge('relative')}></span>
// 					<svg
// 						width='19'
// 						viewBox='0 0 19 56'
// 						fill='none'
// 						xmlns='http://www.w3.org/2000/svg'
// 						className='absolute left-[calc(100%-1px)] top-0 h-full -scale-x-100'
// 						preserveAspectRatio='none'
// 					>
// 						<path
// 							d='M13.3275 3.03C14.3875 1.16 16.3775 0 18.5375 0V56C16.3875 56 14.3975 54.84 13.3275 52.97L0.7875 30.97C-0.2625 29.13 -0.2625 26.87 0.7875 25.03L13.3275 3.03Z'
// 							className={variationClasses[variation].outlineFill}
// 						/>
// 					</svg>
// 				</div>
// 			)}

// 			{/* inner button */}
// 			<div
// 				className={twMerge(
// 					`relative flex h-full w-full items-center justify-center ${sizeClasses[size]} text-center transition-colors ${variationClasses[variation].text}`,
// 					variationClasses[variation].bg,
// 					innerBg
// 				)}
// 			>
// 				<svg
// 					width='19'
// 					viewBox='0 0 19 56'
// 					fill='none'
// 					xmlns='http://www.w3.org/2000/svg'
// 					className={`absolute right-[calc(100%-1px)] top-0 h-full`}
// 					preserveAspectRatio='none'
// 				>
// 					<path
// 						d='M13.3275 3.03C14.3875 1.16 16.3775 0 18.5375 0V56C16.3875 56 14.3975 54.84 13.3275 52.97L0.7875 30.97C-0.2625 29.13 -0.2625 26.87 0.7875 25.03L13.3275 3.03Z'
// 						className={twMerge(variationClasses[variation].fill, innerFill)}
// 					/>
// 				</svg>
// 				<span className={twMerge('relative z-10')}>{text}</span>
// 				<svg
// 					width='19'
// 					viewBox='0 0 19 56'
// 					fill='none'
// 					xmlns='http://www.w3.org/2000/svg'
// 					className={`absolute left-[calc(100%-1px)] top-0 h-full -scale-x-100`}
// 					preserveAspectRatio='none'
// 				>
// 					<path
// 						d='M13.3275 3.03C14.3875 1.16 16.3775 0 18.5375 0V56C16.3875 56 14.3975 54.84 13.3275 52.97L0.7875 30.97C-0.2625 29.13 -0.2625 26.87 0.7875 25.03L13.3275 3.03Z'
// 						className={twMerge(variationClasses[variation].fill, innerFill)}
// 					/>
// 				</svg>
// 			</div>
// 		</>
// 	);

// 	const classNameAttr = twMerge(
// 		'group relative flex  w-full max-w-[250px] px-[19px] items-center justify-center font-heading font-medium uppercase tracking-button',
// 		className
// 	);

// 	if (isButton) {
// 		return <button className={classNameAttr}>{innerButton}</button>;
// 	}

// 	return (
// 		<Link
// 			href={link}
// 			className={classNameAttr}
// 		>
// 			{innerButton}
// 		</Link>
// 	);
// };

// export default Button;
