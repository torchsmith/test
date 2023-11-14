import { twMerge } from 'tailwind-merge';
import { Paragraph_Type } from '@/lib/acfFields';

interface WysiwigProps {
	content: string;
	paragraphType?: keyof typeof Paragraph_Type;
	limit?: number;
	className?: string;
}

export default function Wysiwyg({
	content,
	paragraphType,
	limit,
	className,
}: WysiwigProps) {
	return (
		<div
			className={twMerge(
				'wysiwyg',
				'flex flex-col gap-6',
				paragraphType && Paragraph_Type[paragraphType],
				className
			)}
			dangerouslySetInnerHTML={{
				__html: limit ? content.slice(0, limit) : content,
			}}
		/>
	);
}
