import TextHeadline from '@/components/TextHeadline';
import Wysiwyg from '@/components/Wysiwyg';
import { useId } from 'react';
import { twMerge } from 'tailwind-merge';
import Section from '@/components/Section';
import { textClasses } from '@/lib/type';
import Heading from '@/components/Heading';
import { decodeHtmlEntity } from '@/lib/utilities';
import { WP_ACF_Widget__Text_Group } from '@/types/WP_ACF_Widget__Text_Group';

interface Values {
	heading: string;
	content: string;
}

interface TextSharedValuesProps {
	acf: WP_ACF_Widget__Text_Group & {
		intro: string;
		values: Values[];
	};
}

export default function TextSharedValues({ acf }: TextSharedValuesProps) {
	const id = useId();
	return (
		<Section>
			<div className='flex flex-col gap-x-[112px] xl:flex-row'>
				<TextHeadline heading={acf.heading}></TextHeadline>
				<div className='mt-10 xl:mt-0'>
					<Wysiwyg
						className={twMerge(
							textClasses['large'],
							'max-w-[602px] pb-[48px] md:pb-20'
						)}
						content={acf.intro}
					/>

					<div className='grid  grid-cols-1 gap-x-[120px] gap-y-20 md:grid-cols-2'>
						{acf.values.map((value: Values, key: any) => (
							<div key={id + key}>
								<Heading
									text={value.heading}
									tag='h2'
									className='mb-4 flex min-h-[2lh] items-end'
								/>
								<Wysiwyg
									content={value.content}
									paragraphType='Large'
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</Section>
	);
}
