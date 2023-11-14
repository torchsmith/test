import Link from 'next/link';

interface NewsItemProps {
	title?: string;
	date?: string;
	content?: string;
	link?: string;
	link_text?: string;
}

const NewsItem: React.FC<NewsItemProps> = ({
	title = 'Title',
	date = 'Date',
	content = 'Content',
	link = '/',
	link_text = 'External link',
}) => {
	return (
		<div className='news-item contents'>
			<div className='title text p-6'>{title}</div>
			<div className='content-wrapper'>
				<div className='date'>{date}</div>
				<div className='content'>{content}</div>
				<Link
					className='link'
					href={link}
				>
					{' '}
					{link_text}
				</Link>
			</div>
			<style>
				{`
            .news-item .title{
                order: 1;
            }
            .news-item .content-wrapper{
                order: 2;
            }
        `}
			</style>
		</div>
	);
};

export default NewsItem;
