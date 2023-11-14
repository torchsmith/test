import Section from '@/components/Section';
import GridCareers from '@/components/GridCareers/GridCareers';
import TextHeadline from '@/components/TextHeadline';
import Collapsible from '@/components/Collapsible';
import Wysiwyg from '@/components/Wysiwyg';
import { WP_ACF_Post__Career } from '@/types/WP_ACF_Post__Career';
import { CareerCell } from '@/components/GridCareers/CellCareers';
import { WP_REST_API_Post } from 'wp-types';
import { loadPostsEmbed } from '@/api/loadPostsEmbed';

interface Faq {
	heading: string;
	content: string;
}

interface CareersFeedSectionProps {
	acf: {
		acf_fc_layout: string;
		intro: string;
		intro_no_careers: string;
		faqs: Faq[];
	};
}

export default async function CareersFeedSection({
	acf,
}: CareersFeedSectionProps) {
	let careers = await loadPostsEmbed({
		postType: 'career',
		max: 30,
	});

	if (!careers) {
		return null;
	}

	let careerCells = careers.map((career) => {
		let cell: CareerCell = {
			link: '/career/' + career.slug,
			heading: career.title['rendered'],
			// For Speed, hasACF checked the first career
			content: career.acf!.summary,
		};
		return cell;
	});

	return (
		<Section className='bg-white'>
			<GridCareers
				intro={acf.intro}
				intro_no_careers={acf.intro_no_careers}
				careersCells={careerCells}
			></GridCareers>
			<div className='mt-[102px] flex flex-col gap-x-[152px] md:flex-row'>
				<div className='flex-shrink-0'>
					<div className='w-[165px]'>
						<TextHeadline heading='Faqs' />
					</div>
				</div>
				<div className='mt-10 w-[80%] md:mt-0 md:w-[50%]'>
					{acf.faqs.map((faq: Faq, index: number) => {
						return (
							<Collapsible
								key={'faqs-' + index}
								heading={faq.heading}
							>
								<Wysiwyg
									content={faq.content}
									paragraphType='Large'
									className='[&>ul>li]:mb-2 [&>ul>li]:leading-[1.4em] [&>ul]:ml-1'
								/>
							</Collapsible>
						);
					})}
				</div>
			</div>
		</Section>
	);
}
