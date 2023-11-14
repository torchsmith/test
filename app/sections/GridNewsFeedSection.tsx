'use client';
import Section from '@/components/Section';
import GridNews from '@/components/GridNews/GridNews';
import { useState } from 'react';
import { useTerms } from '@/api/useTerms';
import { usePosts } from '@/api/usePosts';
import { textClasses } from '@/lib/type';
import { Filter, Filters } from './InsightsPosts';
import { WP_CUSTOM_Term__X_Category } from '@/types/WP_CUSTOM_Term__X_Category';

interface GridNewsFeedSectionProps {
	acf: {
		acf_fc_layout: string;
	};
}

export default function GridNewsFeedSection({ acf }: GridNewsFeedSectionProps) {
	const {
		terms: agencyCategoriesBase,
		isLoading: agencyLoading,
		error: agencyError,
	} = useTerms({
		taxonomy: 'agency-category',
	});
	// Type guard
	const agencyCategories = agencyCategoriesBase as WP_CUSTOM_Term__X_Category[];
	if (
		agencyCategories &&
		agencyCategories[0].countNews == undefined &&
		agencyCategories[0].count_news == undefined
	)
		return null;

	const {
		terms: industryCategoriesBase,
		isLoading: industryLoading,
		error: industryError,
	} = useTerms({
		taxonomy: 'industry-category',
	});
	// Type guard
	const industryCategories =
		industryCategoriesBase as WP_CUSTOM_Term__X_Category[];
	if (
		industryCategories &&
		industryCategories[0].countNews == undefined &&
		industryCategories[0].count_news == undefined
	)
		return null;

	const [filters, setFilters] = useState<Filters>({
		Agency: [],
		Industry: [],
	});

	let filterOptions: Filters = {};

	if (Array.isArray(agencyCategories)) {
		filterOptions['Agency'] = agencyCategories
			.filter((tag: WP_CUSTOM_Term__X_Category) => {
				return tag.count_news !== 0;
			})
			.map((tag: WP_CUSTOM_Term__X_Category) => {
				return {
					id: tag.id,
					name: tag.name,
					taxonomy: tag.taxonomy,
				};
			});
	}
	if (Array.isArray(industryCategories)) {
		filterOptions['Industry'] = industryCategories
			.filter((tag: WP_CUSTOM_Term__X_Category) => {
				return tag.count_news !== 0;
			})
			.map((tag: WP_CUSTOM_Term__X_Category) => {
				return {
					id: tag.id,
					name: tag.name,
					taxonomy: tag.taxonomy,
				};
			});
	}
	const filterKeys = Object.keys(filterOptions);

	let taxArg: {
		[key: string]: number[];
	} = {};

	if (filters['Agency'].length) {
		taxArg['agency-category'] = filters['Agency'].map(
			(filter: Filter) => filter.id
		);
	}
	if (filters['Industry'].length) {
		taxArg['industry-category'] = filters['Industry'].map(
			(filter: Filter) => filter.id
		);
	}

	let {
		postPages,
		isValidating: postsValidating,
		error: postsError,
		size,
		setSize,
		showMore,
	} = usePosts({
		postType: 'news',
		max: 12,
		urlparams: {
			...(Object.values(filters).some((val) => val.length)
				? {
						tax_relation: 'OR',
						...taxArg,
				  }
				: {}),
		},
		orderby: 'date',
		order: 'desc',
		offset: filters.Agency.length > 0 || filters.Industry.length > 0 ? 0 : 1,
	});
	const posts = postPages?.flat(1);
	if (
		posts &&
		(posts[0].acf?.external_link_display == undefined ||
			posts[0].acf.external_link == undefined)
	)
		return null;

	return (
		<Section>
			{filterKeys.length > 0 &&
				filterKeys.map((key: string) => (
					<div
						key={key}
						className='mt-4 flex flex-wrap items-center gap-4'
					>
						<span
							className={`min-w-[80px] uppercase text-red ${textClasses.micro}`}
							dangerouslySetInnerHTML={{ __html: key }}
						></span>
						{filterOptions[key].map((filter: Filter, index: number) => (
							<button
								key={index}
								onClick={() => {
									if (filters[key].some((f: Filter) => f.id == filter.id)) {
										setFilters({
											...filters,
											[key]: filters[key].filter(
												(f: Filter) => f.id != filter.id
											),
										});
									} else {
										setFilters({
											...filters,
											[key]: [...filters[key], filter],
										});
									}
								}}
								className={`cursor-pointer rounded-full border border-navy px-6 py-2 text-center transition-all  ${
									filters[key].some((f: Filter) => f.id == filter.id)
										? 'bg-navy text-white hover:bg-navy/90'
										: 'bg-white text-navy hover:bg-navy/10'
								}`}
								dangerouslySetInnerHTML={{ __html: filter.name }}
							></button>
						))}
					</div>
				))}
			<GridNews
				pages={size}
				setPages={setSize}
				showMore={showMore}
				posts={Array.isArray(posts) ? posts : []}
			></GridNews>
		</Section>
	);
}
