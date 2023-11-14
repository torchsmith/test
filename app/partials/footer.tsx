import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faFacebookF,
	faInstagram,
	faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import Dropdown from '../components/Dropdown';
import { textClasses } from '@/lib/type';

const industriesLinks = [
	{
		name: 'Amusement & Recreation',
		href: '/industries/amusement-recreation',
	},
	{
		name: 'Alcohol & Beverage',
		href: '/industries/alcohol-beverage',
	},
	{
		name: 'Healthcare',
		href: '/industries/healthcare',
	},
	{
		name: 'Home Renovation',
		href: '/industries/home-renovation',
	},
	{
		name: 'Restaurant & Hospitality',
		href: '/industries/restaurant-and-hospitality',
	},
];

const colOneLinks = [
	{
		name: 'Work',
		href: '/work',
	},
	{
		name: 'About',
		href: '/about',
	},
	{
		name: 'Capabilities',
		href: '/capabilities',
	},
];

const colTwoLinks = [
	{
		name: 'Insights',
		href: '/insights',
	},
	{
		name: 'News',
		href: '/news',
	},
	{
		name: 'Contact',
		href: '/Contact',
	},
	{
		name: 'Careers',
		href: '/careers',
	},
];

const socialLinks = [
	{
		icon: faFacebookF,
		hover: 'hover:border-red',
		text: 'text-red',
		href: 'https://www.facebook.com/',
	},
	{
		icon: faInstagram,
		hover: 'hover:border-cyan',
		text: 'text-cyan',
		href: 'https://www.instagram.com/',
	},
	{
		icon: faLinkedinIn,
		hover: 'hover:border-yellow',
		text: 'text-yellow',
		href: 'https://www.linkedin.com/',
	},
];

export default function Footer({
	linkMinHeight = 'md:min-w-[80px]', //Used in both Col1's Links and Dropdown component
}) {
	return (
		<footer className='flex flex-row flex-wrap items-start justify-between gap-7 overflow-hidden bg-navy px-8 pb-0 pt-20 text-cream md:flex-nowrap md:justify-around md:px-8 md:py-[88px] md:pt-24'>
			<div className='logo-wrapper order-1 w-[72px] md:w-20'>
				<Link href='/'>
					<Image
						src='/media/redroc-mark.svg'
						height={80}
						width={88}
						alt='Logo'
					/>
				</Link>
			</div>
			<div
				className={twMerge(
					textClasses.micro,
					'relative order-5 flex min-w-full flex-col pb-8 pt-8 text-cream md:order-2 md:min-w-0 md:pb-0 md:pt-0',
					// Bg Before
					"[&>*]:z-1 before:absolute before:-inset-8 before:inset-y-0 before:z-0 before:h-full  before:bg-dark-navy before:content-[''] md:before:content-[] [&>*]:relative [&>div]:relative"
				)}
			>
				<div>
					3001 S Lamar Blvd, Suite 250,
					<br />
					Austin TX 78704
				</div>

				<br />

				<a
					href='mailto:hello@redrocaustin.com'
					className='text-cream hover:underline'
				>
					hello@redrocaustin.com
				</a>
				<a
					href='tel:5127701056'
					className='text-cream hover:underline'
				>
					(512) 770 1056
				</a>

				<div className='pt-10 text-dark-text md:pt-[72px]'>
					© 2023 Redroc Austin
				</div>
			</div>
			<div className='order-1 flex w-full min-w-full flex-row  gap-4 pt-4 text-[16px] text-cream md:order-3 md:w-[unset] md:min-w-0 md:gap-[120px] md:pb-0 md:pt-0'>
				<div className='flex min-w-[50%] flex-col gap-4 md:min-w-0'>
					{colOneLinks.map((link, key) => (
						<Link
							key={'colone' + key}
							className={twMerge(linkMinHeight)}
							href={link.href}
						>
							{link.name}
						</Link>
					))}
					<Dropdown
						href='/industries'
						className={twMerge(linkMinHeight)}
						heading='Industries'
					>
						{industriesLinks.map((link, key) => (
							<li
								key={'industries' + key}
								className=''
							>
								<Link href={link.href}>{link.name}</Link>
							</li>
						))}
					</Dropdown>
				</div>
				<div className='flex flex-col gap-4'>
					{colTwoLinks.map((link, key) => (
						<Link
							key={'coltwo' + key}
							className={twMerge(linkMinHeight)}
							href={link.href}
						>
							{link.name}
						</Link>
					))}
				</div>
			</div>
			<div className='order-2 flex flex-row gap-4 md:order-5'>
				{socialLinks.map((link, key) => (
					<Link
						key={'social' + key}
						href={link.href}
						className={twMerge(
							'relative rounded-full border border-dark-navy bg-dark-navy transition',
							link.hover,
							'h-14 w-14 md:h-10 md:w-10'
						)}
					>
						<FontAwesomeIcon
							icon={link.icon}
							className={twMerge(
								'absolute left-1/2 right-0 top-1/2 h-[14px] w-4 -translate-x-1/2 -translate-y-1/2 transform',
								link.text
							)}
							height={14}
							width={14}
						/>
					</Link>
				))}
			</div>
		</footer>
	);
}
