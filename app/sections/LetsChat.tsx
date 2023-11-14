import Button from '../components/Button';
import Section from '@/components/Section';
import Heading from '@/components/Heading';
import { headingClasses } from '@/lib/type';
import { twMerge } from 'tailwind-merge';

export default async function LetsChat() {
	return (
		<Section
			className='bg-red py-20 text-cream md:py-16'
			innerClassName='flex flex-col lg:flex-row lg:justify-center lg:items-center gap-6 md:gap-4 lg:gap-12'
		>
			<Heading
				tag='h2'
				classLevel={'h1'}
				text={`Let's chat`}
				className={twMerge(
					'flex-1 shrink-0 pb-2 text-[36px] text-cream lg:text-center'
				)}
			/>
			<div className={'max-w-[502px] text-xl'}>
				<span
					className={twMerge(
						headingClasses['h3'],
						'mr-2 block text-cream md:inline'
					)}
				>
					Don&apos;t be a stranger.
				</span>
				We&apos;d love to talk with you about how to give your brand a boost.
			</div>
			<Button
				className='lg:self-[unset] self-start'
				link='/contact'
				text='Get In Touch'
				variation='primary'
				size='medium short'
			/>
		</Section>
	);
}
