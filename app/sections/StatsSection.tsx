import Section from '@/components/Section';
import Stats from '@/components/Stats';
import { WP_ACF_Widget__Stats } from '@/types/WP_ACF_Widget__Stats';

interface StatsSectionProps {
	acf: {
		acf_fc_layout: string;
		stats: WP_ACF_Widget__Stats[];
	};
}

export default async function StatsSection({ acf }: StatsSectionProps) {
	return (
		<Section className='pt-2 md:pt-2'>
			<Stats stats={acf.stats}></Stats>
		</Section>
	);
}
