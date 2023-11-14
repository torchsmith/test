import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import { headingClasses, miscClasses } from '@/lib/type';
import Section from '@/components/Section';
import { loadPostsEmbed } from '@/api/loadPostsEmbed';
import { getFeaturedMedia } from '@/lib/utilities';
import { WP_REST_API_Post } from 'wp-types';
import { WP_ACF_Post__Team_Member } from '@/types/WP_ACF_Post__Team_Member';

interface GridEmployeeSectionProps {
	acf: {
		acf_fc_layout: string;
	};
}

export default async function GridEmployeeSection({
	acf,
}: GridEmployeeSectionProps) {
	let teamMembersBasicPost = await loadPostsEmbed({
		postType: 'team-member',
		orderby: 'menu_order',
		order: 'asc',
	});
	if (!teamMembersBasicPost) {
		return null;
	}
	// Check if the team member has a role
	let teamMembers = teamMembersBasicPost;
	if (
		teamMembers[0].acf === undefined ||
		(teamMembers[0].acf !== undefined && teamMembers[0].acf.role === undefined)
	) {
		return null;
	}

	const images = teamMembers.map((teamMember) => {
		return getFeaturedMedia(teamMember);
	});

	return (
		<Section className='bg-cream pt-0 md:pt-0 '>
			<div className='grid grid-cols-[repeat(auto-fit,_minmax(_min(400px,100%)_,1fr))] gap-x-4 gap-y-20'>
				{teamMembers.map((member, key: number) => {
					const image = images[key];
					if (!image) return null;
					return (
						<div
							key={'employee-grid-' + key}
							className='mx-auto flex w-[300px] flex-col sm:w-[400px]'
						>
							<div>
								{/* Posts */}
								{images[key] && (
									<Image
										className='object-cover'
										alt={image.alt_text}
										width={image.media_details.width}
										height={image.media_details.height}
										src={image.source_url}
									/>
								)}
							</div>
							<div>
								<div className={twMerge(headingClasses['h4'], 'mt-6')}>
									{member.title['rendered']}
								</div>
								<div
									className={twMerge(miscClasses['navLight'], 'mt-2 text-red')}
								>
									{member.acf.role}
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</Section>
	);
}
