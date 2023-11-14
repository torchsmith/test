import { twMerge } from 'tailwind-merge';
import { Bg, Hidden } from '@/lib/acfFields';

const Type = {
	Section: 'h-[120px]',
	'Section Small': 'h-[88px]',
	'Content Extra Large': 'h-[102px]',
	'Content Large': 'h-20',
	'Content Medium Large': 'h-16',
	'Content Medium': 'h-14',
	'Content Small': 'h-10',
} as const;

interface SpacerProps {
	acf: {
		acf_fc_layout?: string;
		type: keyof typeof Type;
		background: keyof typeof Bg;
		responsive_controls?: {
			hide_on: keyof typeof Hidden;
		};
	};
}

export default function Spacer({ acf }: SpacerProps) {
	return (
		<>
			<div
				className={twMerge(
					Type[acf.type],
					Bg[acf.background],
					acf.responsive_controls && Hidden[acf.responsive_controls.hide_on]
				)}
			/>
		</>
	);
}
