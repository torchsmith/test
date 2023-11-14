import { Bg, Paragraph_Type } from '@/lib/acfFields';
import { WP_ACF_Widget__Button } from './WP_ACF_Widget__Button';
import { WP_EMBED__Attachment } from './WP_EMBED__Attachment';

export const TextGroupSkins = {
	MobileCentered: 'Mobile Centered',
	DesktopHeaderLeft: 'Desktop Header Left',
} as const;

export interface WP_ACF_List_Item {
	text: string;
}

export interface WP_ACF_Widget__Section_Item {
	text: string;
	skin?: string;
	is_a_new_column?: boolean;
	list_items: WP_ACF_List_Item[] | false;
}

export type WP_ACF_Section_Items = WP_ACF_Widget__Section_Item[] | false;

export type WP_ACF_Widget__Text_Group = {
	acf_fc_layout: string;
	background: keyof typeof Bg;
	direction?: string;
	skin?: (typeof TextGroupSkins)[keyof typeof TextGroupSkins];
	media: {
		media_type: string;
		image: WP_EMBED__Attachment;
		video: WP_EMBED__Attachment;
	};
	heading: string;
	sub_heading: string;
	number_of_columns: number;
	paragraph_type: keyof typeof Paragraph_Type;
	section_items: WP_ACF_Section_Items;
	button: WP_ACF_Widget__Button;

	heading_width_pixels?: number;
	always_centered?: boolean;
	section_max_width?: string;
};
