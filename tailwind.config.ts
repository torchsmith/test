import type { Config } from 'tailwindcss';

// const containerMaxWidth = '71.25rem'; // 1140px
const containerMaxWidth = '1234px';
const plugin = require('tailwindcss/plugin');

const config: Config = {
	darkMode: 'class',
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		colors: {
			red: '#f24b3d',
			'dark-red': '#C33C31',
			cream: '#F3F2ED',
			'light-cream': '#FBFAF7',
			navy: '#2F3F54',
			'dark-navy': '#263243',
			white: '#fff',
			cyan: '#4DC8EE',
			'dark-cyan': '#02779B',
			yellow: '#F2B807',
			'dark-text': '#828C98',
			'grey-30': '#B3B3B3',
			'grey-40': '#999999',
			black: '#000',
		},
		fontFamily: {
			sans: ['Nunito', 'sans-serif'],
			heading: ['dunbar-tall', 'sans-serif'],
			serif: ['Merriweather', 'serif'],
		},
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			fontWeight: {
				inherit: 'inherit',
			},
			letterSpacing: {
				button: '3.2px',
			},
			maxWidth: {
				page: `${containerMaxWidth}`, // 1140px
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/container-queries'),
		// @ts-ignore
		plugin(function ({ addUtilities }) {
			// Add your custom styles here
			addUtilities({
				// '.heading-h1': {
				// 	'font-size': '48px',
				// 	'font-weight': '800',
				// 	'font-family': 'dunbar-tall',
				// 	'line-height': '1.2em',
				// 	'letter-spacing': '0.03em',
				// },
				// '.heading-h1-mobile': {
				// 	'font-size': '32px',
				// 	'font-weight': '800',
				// 	'font-family': 'dunbar-tall',
				// 	'line-height': '1.2em',
				// 	'letter-spacing': '0.03em',
				// },
				// '.heading-h2': {
				// 	'font-size': '30px',
				// 	'font-weight': '800',
				// 	'font-family': 'dunbar-tall',
				// 	'line-height': '1em',
				// 	'letter-spacing': '0.03em',
				// },
				// '.heading-h3': {
				// 	'font-size': '24px',
				// 	'font-weight': '800',
				// 	'font-family': 'dunbar-tall',
				// 	'line-height': '34px',
				// 	'letter-spacing': '0.03em',
				// },
				// '.heading-h4': {
				// 	'font-size': '18px',
				// 	'font-weight': '500',
				// 	'font-family': 'dunbar-tall',
				// 	'line-height': '1.5em',
				// 	'letter-spacing': '0.03em',
				// },
				// '.heading-h5': {
				// 	'font-size': '14px',
				// 	'font-weight': '500',
				// 	'font-family': 'dunbar-tall',
				// 	'line-height': '1.4em',
				// 	'letter-spacing': '0.03em',
				// },
				// '.text-p': {
				// 	'font-size': '16px',
				// 	'font-weight': '400',
				// 	'font-family': 'nunito',
				// 	'line-height': '24px',
				// 	'letter-spacing': '0.03em',
				// },
				'.text-p-large': {
					'font-size': '20px',
					'font-weight': '400',
					'font-family': 'nunito',
					'line-height': '1.4em',
					'letter-spacing': '0.03em',
				},
				'.text-p-micro': {
					'font-size': '12px',
					'font-weight': '400',
					'font-family': 'nunito',
					'line-height': '1em',
					'letter-spacing': '0.03em',
				},
				'.text-p-large-emphasis': {
					'font-size': '20px',
					'font-weight': '600',
					'font-family': 'nunito',
					'line-height': '1.4em',
					'letter-spacing': '0.03em',
				},
				'.misc-nav': {
					'font-size': '16px',
					'font-weight': '500',
					'font-family': 'dunbar-tall',
					'line-height': '1em',
					'letter-spacing': '0.2em',
				},
				'.misc-nav-light': {
					'font-size': '16px',
					'font-weight': '350',
					'font-family': 'dunbar-tall',
					'line-height': '1em',
					'letter-spacing': '0.2em',
				},
				'.misc-desktop-menu-large': {
					'font-size': '42px',
					'font-weight': '800',
					'font-family': 'dunbar-tall',
					'line-height': '1.2em',
					'letter-spacing': '0.03em',
				},
				'.misc-desktop-drop-down': {
					'font-size': '18px',
					'font-weight': '500',
					'font-family': 'dunbar-tall',
					'line-height': '2em',
					'letter-spacing': '0.03em',
				},
				// '.form-entry': {
				// 	'font-size': '16px',
				// 	'font-weight': '700',
				// 	'font-family': 'nunito',
				// 	'line-height': '1em',
				// 	'letter-spacing': '0.03em',
				// },
				// '.form-default': {
				// 	'font-size': '16px',
				// 	'font-weight': '400',
				// 	'font-decoration': 'italic',
				// 	'font-family': 'nunito',
				// 	'line-height': '1em',
				// 	'letter-spacing': '0.03em',
				// },
				// '.form-error': {
				// 	'font-size': '16px',
				// 	'font-weight': '400',
				// 	'font-decoration': 'italic',
				// 	'font-family': 'nunito',
				// 	'line-height': '1em',
				// 	'letter-spacing': '0.03em',
				// },
			});
		}),
	],
};
export default config;
