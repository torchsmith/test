import Script from 'next/script';
import './globals.scss';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Redroc',
	description: 'Yes.',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<head>
				<link
					rel='stylesheet'
					href='https://use.typekit.net/rgm6ord.css'
				/>
			</head>
			<body>
				{children}
				{/* <Script
					strategy='afterInteractive'
					id='projecthuddle'
					dangerouslySetInnerHTML={{
						__html: `
            (function(d, t, g, k) {
							var ph = d.createElement(t),
							s = d.getElementsByTagName(t)[0],
							t = (new URLSearchParams(window.location.search)).get(k);
							t && localStorage.setItem(k, t);
							t = localStorage.getItem(k);
							ph.type = 'text/javascript';
							ph.async = true;
							ph.defer = true;
							ph.charset = 'UTF-8';
							ph.src = g + '&v=' + (new Date()).getTime();
							ph.src += t ? '&' + k + '=' + t : '';
							s.parentNode.insertBefore(ph, s);
						})(document, 'script', '//feedback.siteservice.net/?p=15995&ph_apikey=f3def7f60edab2f60694e376ae1515a0', 'ph_access_token');
          `,
					}}
				/> */}
			</body>
		</html>
	);
}
