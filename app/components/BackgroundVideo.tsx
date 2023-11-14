import { twMerge } from 'tailwind-merge';

interface BackgroundVideoProps {
	src: string;
	controls?: boolean;
}

export default function BackgroundVideo({
	src,
	controls = false,
}: BackgroundVideoProps) {
	return (
		<div className='absolute inset-0'>
			<video
				autoPlay={!controls}
				loop
				muted
				controls={controls}
				className='h-full w-full object-cover'
			>
				<source
					src={src}
					type='video/mp4'
				></source>
			</video>
		</div>
	);
}
