import Heading from '@/components/Heading';
import Section from '@/components/Section';
import { twMerge } from 'tailwind-merge';
import { headingClasses } from '@/lib/type';
import Collapsible from '@/components/Collapsible';
import ScheduleConsultationForm from '@/components/ScheduleConsultationForm';

interface ScheduleConsultationProps {
	acf: any;
}

export default async function ScheduleConsultation({
	acf,
}: ScheduleConsultationProps) {
	const iconWidth = 24; //px
	return (
		<Section className='bg-cream'>
			<div className='mx-auto flex max-w-[814px] flex-col items-center gap-[24px]'>
				<Heading
					tag='h2'
					classLevel='h1'
					text={acf.heading}
					className='wysiwyg text-center'
				/>
				<div
					className={twMerge('text-center', headingClasses['h4'])}
					dangerouslySetInnerHTML={{ __html: acf.text }}
				></div>
				<Collapsible
					heading={acf.consultation_button_text}
					variation={'scheduleForm'}
				>
					<ScheduleConsultationForm acf={acf} />
				</Collapsible>
			</div>
		</Section>
	);
}
