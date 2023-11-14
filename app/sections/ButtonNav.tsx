import Button from '@/components/Button';
import Section from '@/components/Section';
import { miscClasses } from '@/lib/type';
import { twMerge } from 'tailwind-merge';

interface MenuLink {
	text: string;
	link: string; // unsed now
}

interface ButtonNavProps {
	acf: {
		acf_fc_layout: string;
		button: {
			text: string;
			link: string;
		};
		menu_links: MenuLink[];
	};
}

export default async function ButtonNav({ acf }: ButtonNavProps) {
	return (
		<Section className='hidden pt-0 md:flex md:pt-0'>
			<div className='row mb-4 flex w-full flex-row items-center justify-center gap-1'>
				<hr className='w-full grow text-cyan' />
				<Button
					link={acf.button.link}
					text={acf.button.text}
					variation='quinaryOutline'
					size='nav'
				/>
				<hr className='w-full grow text-cyan' />
			</div>
			{/* Menu Links */}
			{acf.menu_links && (
				<div className='flex flex-row justify-center'>
					{acf.menu_links &&
						acf.menu_links.map((list: MenuLink, key: number) => (
							<div
								key={acf.acf_fc_layout + 'menu' + key}
								className={twMerge(
									'relative px-4 uppercase !leading-10',
									'[&:after]:right-0 [&:after]:top-[50%] [&:after]:h-[1em] [&:after]:w-[2px] [&:after]:translate-y-[-50%] [&:after]:bg-navy [&:after]:content-[""] [&:not(:last-child):after]:absolute',
									miscClasses['navLight']
								)}
								dangerouslySetInnerHTML={{ __html: list.text }}
							></div>
						))}
				</div>
			)}
		</Section>
	);
}
