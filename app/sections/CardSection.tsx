import Section from '@/components/Section';
import { twMerge } from 'tailwind-merge';
import { Bg } from '@/lib/acfFields';
import Card from '@/components/Card';
import { WP_ACF_Widget__Button } from '@/types/WP_ACF_Widget__Button';
import { WP_EMBED__Attachment } from '@/types/WP_EMBED__Attachment';

interface CardSectionProps {
	acf: {
		acf_fc_layout: string;
		heading: string;
		subheading: string;
		content: string;
		image: WP_EMBED__Attachment;
		button: WP_ACF_Widget__Button;
		background: keyof typeof Bg;
	};
}

export default async function CardSection({ acf }: CardSectionProps) {
	const image = acf.image;
	return (
		<Section className={twMerge('')}>
			<Card
				heading={acf.heading}
				subheading={acf.subheading}
				content={acf.content}
				image={image}
				background={Bg[acf.background]}
				buttonText={acf.button?.text || ''}
				buttonLink={acf.button?.link || ''}
			></Card>
		</Section>
	);
}
