'use client';
import { useMenu } from '@/api/useMenu';
import { miscClasses } from '@/lib/type';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

interface HeaderProps {
	light?: boolean;
	fadeBg?: boolean;
}

function Header({ light, fadeBg }: HeaderProps) {
	const [isFixed, setIsFixed] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [openMenuItem, setOpenMenuItem] = useState(-1);

	const { menuItems: desktopMenu } = useMenu({ menuId: 32 });
	const { menuItems: primaryMenu } = useMenu({ menuId: 33 });
	const { menuItems: secondaryMenu } = useMenu({ menuId: 34 });

	const handleScroll = () => {
		if (window.scrollY > 0) {
			setIsFixed(true);
		} else {
			setIsFixed(false);
		}
	};

	const handleMenuToggle = () => {
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		handleScroll();

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<header
			className={`fixed top-0 z-50 flex h-screen max-h-[72px] w-full items-center transition-all ${
				isFixed ? ' bg-navy shadow-lg' : ''
			}
			${!isFixed && fadeBg ? 'to-transparent from-black/75 bg-gradient-to-b' : ''}
			${isFixed ? 'text-white' : light ? 'text-white' : 'text-navy'}`}
		>
			<div className={`max-h-[72px] w-1/2 pl-5 md:pl-8`}>
				<Link
					href='/'
					className='block w-fit'
				>
					{/* Logo */}
					<svg
						className='h-[46px] w-[148px]'
						xmlns='http://www.w3.org/2000/svg'
						xmlnsXlink='http://www.w3.org/1999/xlink'
						viewBox='0 0 148.01 46.84'
					>
						<defs>
							<clipPath id='clippath'>
								<rect
									className='fill-none'
									width='148'
									height='46.83'
								/>
							</clipPath>
						</defs>
						<g
							style={{
								clipPath: 'url(#clippath)',
							}}
						>
							<g>
								<path
									className={'fill-[currentColor]'}
									d='m67.73,10.11h10.74v3.59h-7.14v7.82h6.22v3.59h-6.22v7.83h7.14v3.82h-10.74V10.11Z'
								/>
								<path
									className={'fill-[currentColor]'}
									d='m83.96,10.11h5.34c4.06,0,6.33,2.58,6.33,6.88v12.46c0,4.94-2.41,7.29-6.65,7.29h-5.02V10.11Zm3.6,23.05h1.66c2.01,0,2.78-1.05,2.78-3.33v-12.84c0-2.1-.67-3.3-2.78-3.3h-1.66v19.45h0Z'
								/>
								<path
									className={'fill-[currentColor]'}
									d='m118.75,16.4c0-4.34,3.11-6.51,6.04-6.51s6.05,2.17,6.05,6.51v14.07c0,4.34-3.1,6.5-6.05,6.5s-6.04-2.17-6.04-6.5v-14.07Zm3.6,14.07c0,1.83,1.12,2.69,2.44,2.69s2.44-.86,2.44-2.69v-14.07c0-1.84-1.13-2.69-2.44-2.69s-2.44.85-2.44,2.69v14.07Z'
								/>
								<path
									className={'fill-[currentColor]'}
									d='m148,30.8c0,3.3-2.5,6.17-5.71,6.17-2.76,0-5.93-1.42-5.93-6.28v-14.67c0-3.48,2.37-6.14,5.87-6.14,3.31,0,5.79,2.65,5.79,6.37v1.5h-3.6v-1.27c0-1.5-.85-2.77-2.23-2.77-1.8,0-2.23,1.31-2.23,3.1v13.62c0,1.53.58,2.73,2.2,2.73.99,0,2.26-.6,2.26-2.69v-1.31h3.6v1.65h-.01Z'
								/>
								<path
									className={'fill-[currentColor]'}
									d='m59.07,24.59c2.3-1.35,3.12-3.59,3.12-6.66,0-5.17-2.08-7.82-6.36-7.82h-5.79v26.64h3.6v-11.37h2.15l3.43,11.41h3.78l-3.93-12.2h0Zm-3.38-2.58h-2.05v-8.31h1.86c2.66,0,3.08,1.46,3.08,4.16s-.38,4.16-2.89,4.16h0Z'
								/>
								<path
									className={'fill-[currentColor]'}
									d='m110.11,24.59c2.29-1.35,3.11-3.59,3.11-6.66,0-5.17-2.08-7.82-6.35-7.82h-5.81v26.64h3.61v-11.37h2.15l3.43,11.41h3.79l-3.93-12.2h0Zm-3.39-2.58h-2.05v-8.31h1.87c2.64,0,3.08,1.46,3.08,4.16s-.4,4.16-2.9,4.16h0Z'
								/>
								<path
									className={'fill-red'}
									d='m37.54,10.48L21.15.45c-.49-.3-1.04-.45-1.58-.45s-1.1.15-1.59.45L1.59,10.48c-.98.6-1.59,1.71-1.59,2.92v20.05c0,1.2.61,2.31,1.59,2.92l16.39,10.03c.49.3,1.04.45,1.59.45s1.1-.15,1.59-.45l16.39-10.03c.98-.6,1.59-1.71,1.59-2.92V13.39c0-1.2-.61-2.31-1.59-2.92h-.01Zm.18,22.97c0,.67-.34,1.29-.88,1.62l-16.39,10.03c-.27.17-.58.25-.88.25s-.61-.08-.88-.25L2.29,35.07c-.55-.33-.88-.95-.88-1.62V13.39c0-.67.34-1.29.88-1.62L18.68,1.75c.27-.17.58-.25.88-.25s.61.08.88.25l16.38,10.03c.55.33.88.95.88,1.62v20.05h.01Z'
								/>
								<path
									className={'fill-red'}
									d='m31.2,23.41v-6.66c0-.27-.13-.52-.36-.64l-10.91-6.67c-.21-.14-.49-.14-.7,0l-10.91,6.67c-.21.14-.36.38-.36.64v13.35c0,.27.13.51.35.64l5.45,3.36c.21.14.49.14.7,0,.22-.14.36-.38.36-.64v-12.89l4.75-2.95,4.04,2.47-4.4,2.69c-.21.14-.36.38-.36.64v6.67c0,.27.13.52.36.64l5.45,3.34c.21.14.49.14.7,0l5.45-3.34c.21-.14.36-.38.36-.64s-.13-.52-.36-.64l-4.4-2.68,4.4-2.7c.21-.14.35-.38.35-.64h.01Zm-11.26-7.31c-.22-.14-.49-.14-.71,0l-5.45,3.38c-.21.14-.35.38-.35.64v12.02l-4.04-2.49v-12.48l10.2-6.24,9.5,5.81-4.05,2.47-5.1-3.12h0Zm5.1,16.47l-4.75-2.9v-4.95l8.79,5.38-4.05,2.48h0Zm0-6.67l-4.05-2.47,8.79-5.38v4.94l-4.74,2.92Z'
								/>
							</g>
						</g>
					</svg>
					{/* End Logo */}
				</Link>
			</div>
			<nav
				className={`${
					isOpen ? 'w-full' : 'w-1/2 '
				} flex h-full  max-h-[72px] items-center justify-end gap-8 lg:gap-14`}
			>
				<ul
					className={` ${
						isOpen ? 'w-full' : 'w-3/4'
					} flex h-full items-center justify-end gap-8 font-heading text-sm font-medium uppercase tracking-[2.8px] lg:gap-14`}
				>
					<div className='hidden md:contents'>
						{' '}
						{/* Hides on mobile */}
						{desktopMenu?.map((item: any) => (
							<li
								key={item.ID}
								className={`${isOpen && isFixed ? 'hidden' : 'md:block '}`}
							>
								<Link href={item.relative_url}>{item.title}</Link>
							</li>
						))}
					</div>
					<div
						className='relative z-10 m-0 flex h-[72px] w-[70px] shrink-0 cursor-pointer items-center justify-center bg-red'
						onClick={handleMenuToggle}
					>
						<div className={`${isOpen ? 'open' : ''} wrapper-menu`}>
							<div className='line-menu half start'></div>
							<div className='line-menu'></div>
							<div className='line-menu half end'></div>
						</div>
					</div>
				</ul>
			</nav>
			<div
				className={`
				fixed right-0 top-0 flex h-full w-full flex-col justify-between gap-10 overflow-y-auto border-cyan bg-navy px-5 pb-14 pt-[92px]  opacity-100 transition-all sm:w-auto sm:border-l-2 sm:px-[7.5rem] sm:py-[7.5rem] ${
					isOpen ? 'translate-x-0' : 'translate-x-full'
				} `}
			>
				<ul
					className={`${miscClasses['desktopMenuLarge']} flex h-auto flex-col justify-start gap-10 text-white md:pb-5`}
				>
					{primaryMenu?.map((item: any) => (
						<li key={item.ID}>
							{item.classes.includes('no-link') ? (
								item.children ? (
									<button
										onClick={() => {
											if (openMenuItem === item.ID) {
												setOpenMenuItem(-1);
												return;
											}

											setOpenMenuItem(item.ID);
										}}
									>
										{item.title}
									</button>
								) : (
									<span>{item.title}</span>
								)
							) : (
								<Link href={item.relative_url}>{item.title}</Link>
							)}
							{item.children && openMenuItem === item.ID && (
								<ul
									className={twMerge(
										miscClasses['desktopDropDown'],
										'mt-4 flex flex-col'
									)}
								>
									{item.children.map((item: any) => (
										<li
											key={item.ID}
											className={``}
										>
											<Link href={item.relative_url}>{item.title}</Link>
										</li>
									))}
								</ul>
							)}
						</li>
					))}
				</ul>
				<ul
					className={twMerge(
						'grid w-[298px] grid-cols-2 content-between justify-between gap-8 uppercase text-white [&>:nth-child(even)]:text-end',
						miscClasses['nav']
					)}
				>
					{secondaryMenu?.map((item: any) => (
						<li
							key={item.ID}
							className=''
						>
							<Link href={item.relative_url}>{item.title}</Link>
						</li>
					))}
				</ul>
			</div>
		</header>
	);
}

export default Header;
