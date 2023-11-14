import Section from '@/components/Section';
import Heading from '@/components/Heading';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { headerHeight, headerHeightMobile } from '@/lib/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faEnvelope,
	faPhoneFlip,
	faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { miscClasses, textClasses } from '@/lib/type';
import Wysiwyg from '@/components/Wysiwyg';
import { WP_EMBED__Attachment } from '@/types/WP_EMBED__Attachment';

interface ContactDetailsProps {
	acf: {
		acf_fc_layout: string;
		image: WP_EMBED__Attachment;
		heading: string;
		banner: string;
		paragraph: string;
		email: string;
		phone: string;
		address: string;
	};
}

export default async function ContactDetails({ acf }: ContactDetailsProps) {
	const image = acf.image;

	const infoList = [
		{
			text: acf.email,
			icon: faEnvelope,
			color: 'bg-red',
		},
		{
			text: acf.phone,
			icon: faPhoneFlip,
			color: 'bg-cyan',
		},
		{
			text: acf.address,
			icon: faLocationDot,
			color: 'bg-yellow',
		},
	];
	return (
		<Section
			className={twMerge(
				'md:max--h-[853px] bg-white pb-16 text-navy md:pb-[120px]',
				headerHeight,
				headerHeightMobile
			)}
			innerClassName={twMerge(
				'flex [&>*]:flex-none justify-start flex-col gap-5 md:gap-4 pt-14 md:pt-24'
			)}
		>
			<div className='flex flex-col md:flex-row md:justify-between md:gap-12'>
				{image && (
					<Image
						alt={image.alt}
						width={369}
						height={340}
						src={image.url}
						className='self-start object-contain'
					/>
				)}
				<div className='flex flex-col gap-4 pt-2 md:w-[58%] md:[&>*]:flex-none'>
					<Heading
						tag='h1'
						classLevel={''}
						text={acf.heading}
						className={twMerge(
							'flex-1 shrink-0 uppercase',
							miscClasses['navLight']
						)}
					/>
					<Heading
						tag='div'
						classLevel={'h1'}
						text={acf.banner}
						className={twMerge('wysiwyg max-w-[712px] flex-1 shrink-0')} // 712px doesn't break properly
					/>
					<Wysiwyg
						className={twMerge('max-w-[448px] pt-6')}
						paragraphType='Large'
						content={acf.paragraph}
					/>
					<ul className='flex flex-col gap-4 pt-2'>
						{infoList.map((info, key) => (
							<li
								key={acf.acf_fc_layout + 'info' + key}
								// Last child selector is used to center the address text based on the first row. (50% icon heght - 50% text height)
								className='flex w-full flex-row items-center gap-4 
								[&:is(:last-child)>:last-child]:self-start [&:is(:last-child)>:last-child]:pt-[calc(20px-14px)]'
							>
								<div
									className={twMerge(
										'relative flex-shrink-0 self-start rounded-full',
										info.color,
										'h-14 w-14 md:h-10 md:w-10'
									)}
								>
									<FontAwesomeIcon
										icon={info.icon}
										className={twMerge(
											'absolute left-1/2 right-0 top-1/2 h-[14px] w-4 -translate-x-1/2 -translate-y-1/2 transform text-white'
										)}
										height={14}
										width={14}
									/>
								</div>
								<div
									className={twMerge(
										'text-middle self-center',
										textClasses['largeEmphasis']
									)}
									dangerouslySetInnerHTML={{ __html: info.text }}
								></div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</Section>
	);
}
