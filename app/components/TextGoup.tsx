import Button from '@/components/Button';
import { useId } from 'react';
import { twMerge } from 'tailwind-merge';
import { insertSkinStyles } from '@/lib/utilities';
import TextHeadline from './TextHeadline';
import {
	WP_ACF_List_Item,
	WP_ACF_Widget__Section_Item,
} from '@/types/WP_ACF_Widget__Text_Group';
import {
	WP_ACF_Widget__Text_Group,
	TextGroupSkins,
} from '@/types/WP_ACF_Widget__Text_Group';

interface TextGroupProps {
	acf: WP_ACF_Widget__Text_Group;
	sectionSpacing?: string;
}

export default function TextGroup({ acf, sectionSpacing }: TextGroupProps) {
	const id = 'textgroup' + useId().replaceAll(':', '');

	return (
		<div id={`${id}`}>
			<style
				dangerouslySetInnerHTML={{
					__html: `#${id} > div {
					--section-spacing: ${sectionSpacing};
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
					'flex flex-col justify-between gap-[var(--section-spacing)] md:flex-row md:items-baseline'
				)}
			>
				<div
					className={twMerge(
						'flex w-full flex-col',
						acf.skin == TextGroupSkins.DesktopHeaderLeft &&
							'md:flex-row md:gap-[150px]'
					)}
				>
					{acf.heading && (
						<div
							className='flex-shrink-0'
							style={{
								width: acf.heading_width_pixels + 'px',
							}}
						>
							<TextHeadline
								heading={acf.heading}
								subHeading={acf.sub_heading}
								className='pb-12'
							/>
						</div>
					)}
					{acf.section_items && (
						<div
							className={twMerge(
								'grid w-full gap-y-14',
								insertSkinStyles(
									TextGroupSkins.MobileCentered,
									acf.skin,
									'gap-y-12'
								),
								'dynamic-columns'
							)}
						>
							{/* Section Items */}
							{acf.section_items &&
								acf.section_items.map(
									(section: WP_ACF_Widget__Section_Item, key: number) => {
										if (!section) return null;

										return (
											<div
												key={acf.acf_fc_layout + 'section' + key}
												className={twMerge(
													'flex flex-col justify-start',
													section.is_a_new_column &&
														'md:flex-row md:gap-[72px] md:[&>div:first-child]:w-[44%]'
												)}
											>
												<div
													className={twMerge(
														'wysiwyg',
														insertSkinStyles(
															TextGroupSkins.MobileCentered,
															acf.skin,
															'max-w-[336px] items-center justify-center self-center text-center md:max-w-[unset]'
														),
														'flex w-full flex-col gap-4',

														acf.paragraph_type == 'Large' && 'large',
														acf.paragraph_type == 'Micro' && 'micro',
														acf.paragraph_type == 'Large Emphasis' &&
															'large-emphasis',
														acf.always_centered && 'mx-auto'
													)}
													style={{ maxWidth: `${acf.section_max_width}px` }}
													dangerouslySetInnerHTML={{ __html: section.text }}
												/>

												{/* List Items */}
												{section.list_items && (
													<div
														className={twMerge(
															'grid pt-8 md:pt-2',
															section.is_a_new_column
																? 'grid-cols-[repeat(1,minmax(min(10rem,100%),1fr))]'
																: 'grid-cols-[repeat(1,minmax(min(10rem,100%),1fr))] md:grid-cols-[repeat(2,minmax(min(10rem,100%),1fr))] md:pt-12',
															section.skin == 'Navy' && 'md:pt-8'
														)}
													>
														{section.list_items &&
															section.list_items.map(
																(list: WP_ACF_List_Item, key: number) => (
																	<div
																		key={acf.acf_fc_layout + 'list' + key}
																		className={twMerge(
																			'wysiwyg !leading-10 text-red',
																			section.skin == 'Red' && 'text-red',
																			section.skin == 'Navy' &&
																				'large text-navy [&>ul>li]:mb-4 [&>ul]:ml-4'
																		)}
																		dangerouslySetInnerHTML={{
																			__html: list.text,
																		}}
																	></div>
																)
															)}
													</div>
												)}
												{/* {acf.button && acf.button.has_button && (
										<Link
											href={acf.button.link}
											className={twMerge(
												textClasses['default'],
												'mt-6 block text-red xl:hidden'
											)}
										>
											Read More
										</Link>
									)} */}
											</div>
										);
									}
								)}
						</div>
					)}
				</div>
				{acf.button && acf.button.has_button && (
					<Button
						className='-mt-2 flex justify-start md:mt-0 md:justify-center'
						text={acf.button.text}
						link={acf.button.link || '/'}
						variation='primaryOutline'
						size='large short'
					></Button>
				)}
			</div>
		</div>
	);
}
