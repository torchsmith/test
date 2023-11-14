'use client';
import { twMerge } from 'tailwind-merge';
import Heading from './Heading';
import Button from './Button';
import Image from 'next/image';
import { useRef } from 'react';

interface ScheduleConsultationFormProps {
	acf: {
		acf_fc_layout: string;
		heading: string;
		text: string;
		consultation_button_text: string;
	};
}

const formElements = [
	{
		label: 'Name',
		required: true,
		type: 'text',
	},
	{
		label: 'Role',
		required: true,
		type: 'text',
	},
	{
		label: 'Email',
		required: true,
		type: 'email',
	},
	{
		label: 'Company',
		required: true,
		type: 'text',
	},
	{
		label: 'Website URL',
		required: false,
		type: 'text',
	},
];

export default function ScheduleConsultationForm({
	acf,
}: ScheduleConsultationFormProps) {
	const formCompleteCard = useRef<HTMLDivElement>(null);

	const inputClasses =
		'border w-full border-grey-30 px-4 py-2 [&:placeholder-shown]:font-medium [&:placeholder-shown]:italic [&:not(placeholder-shown)]:font-bold [&:not(placeholder-shown)]:not-italic';

	const errorClasses = twMerge(
		'relative after:absolute after:bottom-0 after:translate-y-[100%] after:left-0 after:content-[attr(data-error)] after:italic after:font-bold after:text-sans after:text-[11px] after:tracking-[0.03em] after:text-red after:leading-[1em] after:pt-1'
	);

	function updateValidity(element: any) {
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
		<div className='mx-auto mt-10 h-fit w-full max-w-[504px] text-center'>
			<div
				ref={formCompleteCard}
				className='hidden w-full flex-col items-center bg-white px-4 pb-20 pt-[64px] md:px-10'
			>
				<Image
					src='/media/paper-plane.svg'
					height={58}
					width={72}
					alt='paper plane icon'
				/>

				<Heading
					tag='h3'
					text='Talk soon!'
					classLevel='h1'
					className='pt-2 text-red'
				/>
				<div className='max-w-[344px] pt-6'>
					Someone will be in touch with you shortly to schedule your
					consultation. Integer posuere erat a ante venenatis dapibus posuere
					velit.
				</div>
			</div>
			<form
				className='flex flex-col gap-x-4 gap-y-6'
				noValidate
				onSubmit={(e) => {
					e.preventDefault();

					let form = e.target as HTMLFormElement;
					if (form.checkValidity()) {
						// console.log('form valid');

						form.style.display = 'none';
						formCompleteCard.current!.style.display = 'flex';
					} else {
						// console.log('form invalid');
						let formElements: any = form.querySelectorAll(':invalid');
						formElements.forEach((element: Element) => {
							updateValidity(element);
						});
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
						className={twMerge(errorClasses)}
					>
						<input
							className={twMerge(inputClasses)}
							required={ele.required}
							type={ele.type}
							placeholder={ele.label + (ele.required ? '*' : '')}
							onInput={(e) => {
								updateValidity(e.target);
							}}
							onBlur={(e) => {
								updateValidity(e.target);
							}}
						></input>
					</div>
				))}
				<div
					data-error=''
					className={twMerge(errorClasses)}
				>
					<textarea
						className={twMerge(inputClasses, 'min-h-[104px]')}
						required
						placeholder='What can we help you with?*'
						onInput={(e) => {
							updateValidity(e.target);
						}}
						onBlur={(e) => {
							updateValidity(e.target);
						}}
					></textarea>
				</div>
				<div className='mt-5 text-left text-sm italic text-red'>
					*Required Fields
				</div>

				<Button
					text='Submit'
					variation={'primaryFill'}
					size='small'
					className='col-span-2 mx-auto mt-8 w-fit'
					isButton
				/>
			</form>
		</div>
	);
}
