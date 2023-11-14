import { text } from 'stream/consumers';

export const textBase = 'font-sans font-normal tracking-[0.03em]';
export const textClasses = {
	base: textBase,
	default: 'text-[16px] leading-[24px] ' + textBase,
	large: 'text-[20px] leading-[1.6em] ' + textBase,
	micro: 'text-[12px] leading-[1.4em] ' + textBase,
	largeEmphasis: 'text-[20px] leading-[1.4em] font-semibold ' + textBase,
};

export const miscBase = 'font-heading';
export const miscClasses = {
	base: miscBase,
	nav: 'font-medium text-[16px] leading-[1em] tracking-[0.2em] ' + miscBase,
	navLight: 'font-[350] text-[16px] leading-[1em] tracking-[0.2em] ' + miscBase,
	desktopMenuLarge:
		'font-extrabold text-[42px] leading-[1.2em] tracking-[0.03em] ' + miscBase,
	desktopDropDown:
		'font-medium text-[18px] leading-[2em] tracking-[0.03em] ' + miscBase,
	letsChat:
		'font-extrabold text-[36px] leading-[1.2em] tracking-[0.03em] ' + miscBase,
};

const headingBase =
	'font-heading [&>strong]:text-red [&>strong]:font-inherit tracking-[0.03em]';
export const headingClasses: Record<
	'base' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | (string & {}),
	string
> = {
	base: headingBase,
	h1:
		'text-[32px] font-extrabold tracking-[1.44px] leading-[1.2em] md:text-[48px] ' +
		headingBase,
	h2: 'text-3xl font-extrabold tracking-[0.9px] leading-[1.2em] ' + headingBase,
	h3:
		'text-2xl font-extrabold tracking-[0.72px] leading-[1.2em] ' + headingBase,
	h4: 'text-lg font-medium tracking-[0.54px] leading-[1.78em] ' + headingBase,
	h5: 'text-sm font-medium tracking-[0.42px] leading-[1.4em] ' + headingBase,
};
const formBase = 'font-sans text-[16px] tracking-[0.03em]';
export const formClasses = {
	base: formBase,
	entry: 'font-bold ' + formBase,
	default: 'italic ' + formBase,
	error: 'italic ' + formBase,
};
