import Section from '@/components/Section';
import TextGroup from '@/components/TextGoup';
import { twMerge } from 'tailwind-merge';
import { Bg } from '@/lib/acfFields';
import { WP_ACF_Widget__Text_Group } from '@/types/WP_ACF_Widget__Text_Group';

const Skins = {
	MobileCentered: 'Mobile Centered',
} as const;

interface TextSectionProps {
	acf: WP_ACF_Widget__Text_Group;
}

export default function TextSection({ acf }: TextSectionProps) {
	return (
		<Section
			className={twMerge(
				Bg[acf.background],
				acf.background == 'Navy' && 'text-cream'
			)}
		>
			<TextGroup
				acf={acf}
				sectionSpacing='120px'
			/>
		</Section>
	);
}
