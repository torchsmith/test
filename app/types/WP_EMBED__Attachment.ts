export type WP_EMBED__Attachment =
	| {
			ID: number;
			id: number;
			title: string;
			filename: string;
			filesize: string;
			url: string;
			link: string;
			alt: string;
			author: string;
			description: string;
			caption: string;
			name: string;
			status: string;
			uploaded_to: number;
			date: string;
			modified: string;
			menu_order: number;
			mime_type: string;
			type: string;
			subtype: string;
			icon: string;
			width: number;
			height: number;
	  }
	| false;
