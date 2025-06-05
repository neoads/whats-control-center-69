
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(0 0% 22%)',
				input: 'hsl(0 0% 22%)',
				ring: 'hsl(142 76% 36%)',
				background: 'hsl(0 0% 8%)',
				foreground: 'hsl(0 0% 95%)',
				primary: {
					DEFAULT: 'hsl(142 76% 36%)',
					foreground: 'hsl(0 0% 98%)'
				},
				secondary: {
					DEFAULT: 'hsl(0 0% 18%)',
					foreground: 'hsl(0 0% 85%)'
				},
				destructive: {
					DEFAULT: 'hsl(0 62.8% 50%)',
					foreground: 'hsl(0 0% 98%)'
				},
				muted: {
					DEFAULT: 'hsl(0 0% 18%)',
					foreground: 'hsl(0 0% 65%)'
				},
				accent: {
					DEFAULT: 'hsl(0 0% 18%)',
					foreground: 'hsl(0 0% 85%)'
				},
				popover: {
					DEFAULT: 'hsl(0 0% 12%)',
					foreground: 'hsl(0 0% 95%)'
				},
				card: {
					DEFAULT: 'hsl(0 0% 12%)',
					foreground: 'hsl(0 0% 95%)'
				},
				sidebar: {
					DEFAULT: 'hsl(0 0% 10%)',
					foreground: 'hsl(0 0% 85%)',
					primary: 'hsl(142 76% 36%)',
					'primary-foreground': 'hsl(0 0% 98%)',
					accent: 'hsl(0 0% 18%)',
					'accent-foreground': 'hsl(0 0% 85%)',
					border: 'hsl(0 0% 22%)',
					ring: 'hsl(142 76% 36%)'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					"0%": {
						opacity: "0",
						transform: "translateY(10px)"
					},
					"100%": {
						opacity: "1",
						transform: "translateY(0)"
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
