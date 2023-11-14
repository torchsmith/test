'use client';
import Section from '@/components/Section';
import Spacer from './Spacer';
import { useState } from 'react';
import { useTerms } from '@/api/useTerms';
import GridPost from '@/components/GridPost/GridPost';
import { usePosts } from '@/api/usePosts';
import TextMediaPost from '@/components/TextImagePost';
import { textClasses } from '@/lib/type';
import { WP_REST_API_Page, WP_REST_API_Term } from 'wp-types';
import { FEATURED_TAG_ID } from '@/lib/constants';
import { WP_CUSTOM_Term__X_Category } from '@/types/WP_CUSTOM_Term__X_Category';

export interface Filter {
	id: number;
	name: string;
	taxonomy: string;
}

export interface Filters {
	[key: string]: Filter[];
}

export interface InsightsPostsProps {
	acf: {
		acf_fc_layout: string;
	};
	page: WP_REST_API_Page;
}

export default function InsightsPosts({ acf, page }: InsightsPostsProps) {
	const {
		terms: agencyCategories,
		isLoading: agencyLoading,
		error: agencyError,
	} = useTerms({
		taxonomy: 'agency-category',
	});
	// // Type guard
	// const agencyCategories = agencyCategoriesBase as WP_CUSTOM_Term__X_Category[];
	// if (
	// 	agencyCategories &&
	// 	agencyCategories[0].countNews == undefined &&
	// 	agencyCategories[0].count_news == undefined
	// )
	// 	return null;

	const {
		terms: industryCategories,
		isLoading: industryLoading,
		error: industryError,
	} = useTerms({
		taxonomy: 'industry-category',
	});
	// Type guard
	// const industryCategories =
	// 	industryCategoriesBase as WP_CUSTOM_Term__X_Category[];
	// if (
	// 	industryCategories &&
	// 	industryCategories[0].countNews == undefined &&
	// 	industryCategories[0].count_news == undefined
	// )
	// 	return null;

	const {
		terms: categories,
		isLoading: categoriesLoading,
		error: categoriesError,
	} = useTerms({
		taxonomy: 'categories',
	});

	const [filters, setFilters] = useState<Filters>({
		Agency: [],
		Industry: [],
		Content: [],
	});

	let filterOptions: Filters = {};

	if (Array.isArray(agencyCategories)) {
		filterOptions['Agency'] = agencyCategories
			.filter((tag: WP_CUSTOM_Term__X_Category) => {
				return tag.count_post !== 0;
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
				return tag.count_post !== 0;
			})
			.map((tag: WP_CUSTOM_Term__X_Category) => {
				return {
					id: tag.id,
					name: tag.name,
					taxonomy: tag.taxonomy,
				};
			});
	}
	if (Array.isArray(categories)) {
		filterOptions['Content'] = categories
			.filter((tag: WP_REST_API_Term) => {
				return tag.count !== 0;
			})
			.map((tag: WP_REST_API_Term) => {
				if (tag.name === 'Uncategorized') return;

				return {
					id: tag.id,
					name: tag.name,
					taxonomy: tag.taxonomy,
				};
			})
			.filter((tag: any) => tag) as Filter[]; // The filter is removing any undefined values
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
	if (filters['Content'].length) {
		taxArg['categories'] = filters['Content'].map(
			(filter: Filter) => filter.id
		);
	}

	// If there is no post with the "Featured" tag, then no post will be displayed
	const featuredPost = usePosts({
		postType: 'posts',
		max: 1,
		urlparams: {
			...(Object.values(filters).some((val) => val.length)
				? {
						tax_relation: 'OR',
						...taxArg,
				  }
				: {}),
			...{
				tax_relation: 'AND',
				tags: FEATURED_TAG_ID,
			},
		},
	}).postPages?.flat(1)[0];
	// console.log('featured', featuredPost);
	// console.log('filters', featuredPost?._embedded['wp:term']?.flat(1));

	const featuredMediaImage = featuredPost
		? featuredPost._embedded['wp:featuredmedia']?.[0]
		: null;

	let {
		postPages,
		isValidating: postsValidating,
		error: postsError,
		size,
		setSize,
		showMore,
	} = usePosts({
		postType: 'posts',
		max: 8,
		urlparams: {
			...(Object.values(filters).some((val) => val.length)
				? {
						tax_relation: 'OR',
						...taxArg,
				  }
				: {}),
			...{
				exclude: featuredPost ? featuredPost.id : -1,
			},
		},
	});
	const posts = postPages?.flat(1);

	if (
		agencyCategories &&
		agencyCategories[0].countNews == undefined &&
		agencyCategories[0].count_news == undefined
	)
		return null;
	if (
		industryCategories &&
		industryCategories[0].countNews == undefined &&
		industryCategories[0].count_news == undefined
	)
		return null;

	return (
		<>
			{filterKeys.length > 0 && (
				<Section innerClassName='overflow-x-auto [&::-webkit-scrollbar]:hidden'>
					{filterKeys.map((key: string) => (
						<div
							key={key}
							className='mt-4 flex flex-nowrap items-center gap-4'
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
									className={`cursor-pointer whitespace-nowrap rounded-full border border-navy px-6 py-2 text-center transition-all  ${
										filters[key].some((f: Filter) => f.id == filter.id)
											? 'bg-navy text-white hover:bg-navy/90'
											: 'bg-white text-navy hover:bg-navy/10'
									}`}
									dangerouslySetInnerHTML={{ __html: filter.name }}
								></button>
							))}
						</div>
					))}
				</Section>
			)}
			<Spacer
				acf={{
					type: 'Section',
					background: 'White',
					responsive_controls: {
						hide_on: 'Mobile',
					},
				}}
			/>
			<Spacer
				acf={{
					type: 'Content Medium Large',
					background: 'White',
					responsive_controls: {
						hide_on: 'Desktop',
					},
				}}
			/>
			{posts?.length ? (
				<>
					{featuredPost && (
						<>
							<Section>
								{featuredMediaImage && featuredPost._embedded['wp:term'] && (
									<TextMediaPost
										heading={'Featured Post'}
										title={featuredPost.title['rendered']}
										content={featuredPost.content['rendered']}
										image={featuredMediaImage}
										link={'/insights/' + featuredPost.slug}
										tags={(
											featuredPost._embedded['wp:term'].find((tagGroup) => {
												return tagGroup[0].taxonomy === 'agency-category';
											}) || []
										).map((tag) => {
											return tag.name;
										})}
									/>
								)}
							</Section>
							<Spacer
								acf={{
									type: 'Section',
									background: 'White',
								}}
							/>
						</>
					)}
					<Section>
						<GridPost
							pages={size}
							setPages={setSize}
							posts={Array.isArray(posts) ? posts : []}
							showMore={showMore}
						></GridPost>
					</Section>
				</>
			) : (
				!postsValidating && <Section>No posts found with that filter.</Section>
			)}
		</>
	);
}
