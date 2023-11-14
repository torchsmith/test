import { defaultSectionPaddingY } from '@/lib/constants';
import { twMerge } from 'tailwind-merge';

interface SectionProps {
	children?: React.ReactNode | React.ReactNode[];
	className?: string;
	innerClassName?: string;
	// verticalSize?: 'medium' | 'large';
	id?: string;
}

const verticalSizeClasses = {
	// medium: 'py-[4.125rem]', //py: 66px
	medium: 'py-16', //py: 64px

	// large: 'pt-[3.625rem] pb-[4.625rem]  md:py-[7.5rem]', //pt: 58px, pb: 74px, md: pt: 120px
	large: defaultSectionPaddingY, //py: 64px md: pt: 120px md: pb: 160px
};

export default function Section({
	children,
	className = '',
	innerClassName = '',
	// verticalSize = 'large',
	id = '',
}: SectionProps) {
	return (
		<section
			className={twMerge(
				'flex justify-center px-6 md:px-8',
				// verticalSizeClasses[verticalSize],
				// verticalSize === 'medium' ? 'py-[4.125rem]' : 'py-[7.5rem]',
				className
			)}
			{...(id && { id: id })}
		>
			<div className={twMerge('w-full max-w-page', innerClassName)}>
				{children}
			</div>
		</section>
	);
}
