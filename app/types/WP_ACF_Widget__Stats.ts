export const StatsSkin = {
	Text: 'Text',
	Hexagon: 'Hexagon',
} as const;

export type WP_ACF_Widget__Stats =
	| {
			name: string;
			value: string;
			unit: string;
			skin: keyof typeof StatsSkin;
	  }
	| false;
