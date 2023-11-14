'use client';
import Section from '@/components/Section';
import Heading from '@/components/Heading';
import { twMerge } from 'tailwind-merge';
import { headingClasses } from '@/lib/type';
import Button from '@/components/Button';
import Wysiwyg from '@/components/Wysiwyg';
import { FormEvent } from 'react';

interface ContactFormProps {
	acf: {
		acf_fc_layout: string;
		header: string;
		content: string;
	};
}

const formElements = [
	{
		label: 'Name',
		required: true,
		type: 'text',
	},
	{
		label: 'Email',
		required: true,
		type: 'email',
	},
];

export default function ContactForm({ acf }: ContactFormProps) {
	const inputClasses = twMerge(
		'w-full border border-grey-30 px-4 py-2 [&:placeholder-shown]:font-medium [&:placeholder-shown]:italic [&:not(placeholder-shown)]:font-bold [&:not(placeholder-shown)]:not-italic'
	);

	const errorClasses = twMerge(
		'relative after:absolute after:bottom-0 after:translate-y-[100%] after:left-0 after:content-[attr(data-error)] after:font-italic after:font-bold after:text-sans after:text-[11px] after:tracking-[0.03em] after:text-red after:leading-[1em] after:pt-1'
	);

	function updateValidity(element: HTMLInputElement) {
		// Reset custom error
		element.setCustomValidity('');
		// Check Validity
		element.checkValidity();
		if (!element.validity.valid) {
			if (element.validity.valueMissing) {
				element.setCustomValidity('Please enter the information above');
			}
			if (element.validity.typeMismatch) {
				switch (element.type) {
					case 'email':
						element.setCustomValidity('Please enter a valid email address');
						break;
					case 'url':
						element.setCustomValidity('Please enter a valid URL');
						break;
					default:
				}
			}
		}
		element.parentElement?.setAttribute(
			'data-error',
			element.validationMessage
		);
	}

	return (
		<Section className='bg-cream'>
			<div className='text-center'>
				<Heading
					tag='h2'
					className='wysiwyg'
					text={acf.header}
				/>
				<Wysiwyg
					className={twMerge(headingClasses['h5'], 'mt-6')}
					content={acf.content}
				/>

				<form
					className='mt-14 grid grid-cols-2 gap-x-4 gap-y-10'
					noValidate
					onSubmit={(e: FormEvent<HTMLFormElement>) => {
						e.preventDefault();

						let form = e.target as HTMLFormElement;
						if (form.checkValidity()) {
							console.log('form valid');
						} else {
							let formElements: NodeListOf<HTMLInputElement> =
								form.querySelectorAll(':invalid');
							formElements.forEach((element: HTMLInputElement) => {
								updateValidity(element);
							});
							console.log('form invalid');
						}
					}}
				>
					<style jsx>
						{`
							[data-error]:not([data-error='']) *::placeholder {
								color: rgb(242, 75, 61);
							}
							[data-error]:not([data-error='']) * {
								border-color: rgb(242, 75, 61);
								color: rgb(242, 75, 61);
							}
						`}
					</style>
					{formElements.map((ele, key) => (
						<div
							key={'formElement' + key}
							data-error=''
							className={twMerge(errorClasses, 'col-span-2 md:col-span-1')}
						>
							<input
								className={twMerge(inputClasses)}
								required={ele.required}
								type={ele.type}
								placeholder={ele.label}
								onInput={(e) => {
									updateValidity(e.target as HTMLInputElement);
								}}
							></input>
						</div>
					))}
					<div
						data-error=''
						className={twMerge(errorClasses, 'col-span-2 h-[104px]')}
					>
						<textarea
							className={twMerge(inputClasses, 'h-full')}
							required
							placeholder='What can we help you with?'
						></textarea>
					</div>

					<Button
						link=''
						text='Submit'
						variation={'primaryFill'}
						size='small'
						className='col-span-2 mx-auto mt-10 w-fit'
						isButton={true}
					/>
				</form>
			</div>
		</Section>
	);
}
