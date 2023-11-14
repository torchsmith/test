export const Bg = {
	White: 'bg-white',
	Cream: 'bg-cream',
	Navy: 'bg-navy',
} as const;

export const Pos = {
	Center: 'justify-center',
	Start: 'justify-start',
} as const;

export const Hidden = {
	Mobile: 'max-[767px]:hidden',
	Desktop: 'md:hidden',
} as const;

// For use in apply paragraph styles to wysiwyg content.
// uses globals css
export const Paragraph_Type = {
	Default: '',
	Large: 'large',
	Micro: 'micro',
	'Large Emphasis': 'large-emphasis',
} as const;
