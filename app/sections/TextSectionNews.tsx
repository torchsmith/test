import { generateUniqueID, parseToUsDate } from '@/lib/utilities';
import { twMerge } from 'tailwind-merge';
import { textClasses } from '@/lib/type';
import Section from '@/components/Section';
import Heading from '@/components/Heading';
import Link from 'next/link';
import { Bg } from '@/lib/acfFields';
import Button from '@/components/Button';
import TextHeadline from '@/components/TextHeadline';
import { loadPostsEmbed } from '@/api/loadPostsEmbed';

interface TextSectionNewsProps {
	acf: {
		background: keyof typeof Bg;
		[key: string]: any;
	};
}

export default async function TextSectionNews({ acf }: TextSectionNewsProps) {
	const posts = await loadPostsEmbed({ postType: 'news', max: 3 });

	const id = 'group-' + generateUniqueID('text-section-news');

	return (
		<Section className={twMerge('bg-cream pb-0 md:pb-0')}>
			<div id={`${id}`}>
				<style
					dangerouslySetInnerHTML={{
						__html: `#${id} > div {
					--section-spacing: ${16};
				}
				@media (min-width: 768px) {
					#${id} .dynamic-columns{	
						grid-template-columns: repeat(${
							acf.number_of_columns || 'auto-fit'
						},minmax(min(10rem,100%), 1fr));
						grid-column-gap: 2rem;
					}
				}`,
					}}
				></style>
				<div
					className={twMerge(
						'flex flex-col justify-between gap-[var(--section-spacing)] md:flex-col md:gap-10'
					)}
				>
					{acf.heading && (
						<TextHeadline
							heading={acf.heading}
							subHeading={acf.sub_heading}
							className='pb-12'
						/>
					)}

					<div className={twMerge('flex flex-col')}>
						{posts && (
							<div
								className={twMerge(
									'grid gap-x-14 gap-y-12 md:gap-y-6',
									'dynamic-columns'
								)}
							>
								{/* Section Items */}
								{posts.map((post: any, key: any) => (
									<div
										key={acf.acf_fc_layout + 'section' + key}
										className='md:contents'
									>
										<Heading
											tag='h2'
											classLevel='h2'
											className='self-end border-b border-cyan pb-6 md:order-1 md:pb-4'
											text={post.title['rendered']}
										/>
										<div className='mt-6 md:order-2 md:mt-0'>
											<div
												className={twMerge(
													textClasses['micro'],
													'pb-6 md:pb-4'
												)}
											>
												{parseToUsDate(post.date)}
											</div>

											<div
												className={twMerge(
													'wysiwyg',
													'flex flex-col gap-4 md:order-2 [&>*]:line-clamp-4',

													acf.paragraph_type == 'Large' && 'large',
													acf.paragraph_type == 'Micro' && 'micro',
													acf.paragraph_type == 'Large Emphasis' &&
														'large-emphasis'
												)}
												dangerouslySetInnerHTML={{
													__html: post.content['rendered'],
												}}
											/>
											{post.acf.external_link && (
												<div className='mt-4'>
													<Link
														href={post.acf.external_link}
														className={twMerge(
															textClasses['default'],
															'hidden flex-row items-center gap-2 text-cyan md:flex [&:visited]:text-dark-cyan'
														)}
													>
														External Link
													</Link>
												</div>
											)}
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
			<Button
				className='mx-auto mt-10 w-fit md:mt-20 md:flex'
				size='medium short'
				text='Read All News'
				link='/news'
			/>
		</Section>
	);
}
