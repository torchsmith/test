import Button, { sizeClasses as buttonSizeClasses } from '@/components/Button';
import Section from '@/components/Section';
import { twMerge } from 'tailwind-merge';
import { Pos, Bg, Hidden } from '@/lib/acfFields';

interface ButtonNavProps {
	acf: {
		position: keyof typeof Pos;
		background: keyof typeof Bg;
		size: keyof typeof buttonSizeClasses;
		responsive_controls: {
			hide_on: keyof typeof Hidden;
		};
		button: {
			text: string;
			link: string;
		};
	};
}

export default async function ButtonNav({ acf }: ButtonNavProps) {
	return (
		<Section
			className={twMerge(
				'hidden pb-0 pt-0 md:flex md:pb-0 md:pt-0',
				Bg[acf.background],
				Hidden[acf.responsive_controls.hide_on]
			)}
		>
			<div className={twMerge('flex flex-row', Pos[acf.position])}>
				<Button
					link={acf.button.link}
					text={acf.button.text}
					size={acf.size}
				/>
			</div>
		</Section>
	);
}
