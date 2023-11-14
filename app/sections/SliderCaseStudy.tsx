import { decodeHtmlEntity } from '@/lib/utilities';
import { CaseStudy as caseStudy } from '@/components/CaseStudy';
import SwiperCaseStudy from '@/components/SwiperCaseStudy/SwiperCaseStudy';
import { loadPostsEmbed } from '@/api/loadPostsEmbed';

interface SliderCaseStudyProps {
	acf: {
		acf_fc_layout: string;
		industry: string;
	};
}

// Todo Remember to apply embed refactor when we have the real data

export default async function SliderCaseStudy({ acf }: SliderCaseStudyProps) {
	const caseStudies = await loadPostsEmbed({
		postType: 'case-study',
		args: { 'acf.industry': acf.industry },
	});
	if (!caseStudies) return null;
	if (caseStudies.length === 0) return null;

	// TODO remap using embed
	const featuredMedias = caseStudies.map(async (caseStudy) => {
		caseStudy._embedded['wp:featuredmedia'];
	});

	const caseStudiesProcessed: caseStudy[] = caseStudies.map(
		(caseStudy, key) => {
			return {
				title: decodeHtmlEntity(caseStudy.title['rendered']),
				category: caseStudy.acf.industry,
				header: caseStudy.acf.header,
				media: featuredMedias[key],
				sections: caseStudy.acf.sections.map((section: any) => {
					return {
						title: section.headline,
						content: section.content,
					};
				}),
				stats: {
					headlineStats: caseStudy.acf.stats.headline_stats.map(
						(hStats: any) => {
							return {
								name: hStats.name,
								value: hStats.value,
								unit: hStats.unit,
								skin: hStats.skin,
							};
						}
					),
					tableHeadline: caseStudy.acf.stats.table_headline,
					tableStats: caseStudy.acf.stats.table_stats.map((tStats: any) => {
						return {
							name: tStats.name,
							value: tStats.value,
						};
					}),
				},
			};
		}
	);

	return (
		<div>
			<SwiperCaseStudy caseStudies={caseStudiesProcessed}></SwiperCaseStudy>
			{/* {caseStudiesProcessed.map((caseStudy: caseStudy, key: any) => (
				<CaseStudy
					key={key}
					caseStudy={caseStudy}
				/>
			))} */}
		</div>
	);
}
