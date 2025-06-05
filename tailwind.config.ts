
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
				// WARION Brand Colors
				warion: {
					black: '#0D0D0D',
					gray: '#1C1C1E',
					blue: '#0EA5E9',
					green: '#10B981',
					red: '#EF4444',
					white: '#F3F4F6',
				},
				// Updated system colors to match WARION palette
				border: 'hsl(0 0% 11%)',
				input: 'hsl(0 0% 11%)',
				ring: '#10B981',
				background: '#0D0D0D',
				foreground: '#F3F4F6',
				primary: {
					DEFAULT: '#10B981',
					foreground: '#F3F4F6'
				},
				secondary: {
					DEFAULT: '#1C1C1E',
					foreground: '#F3F4F6'
				},
				destructive: {
					DEFAULT: '#EF4444',
					foreground: '#F3F4F6'
				},
				muted: {
					DEFAULT: '#1C1C1E',
					foreground: 'hsl(0 0% 65%)'
				},
				accent: {
					DEFAULT: '#0EA5E9',
					foreground: '#F3F4F6'
				},
				popover: {
					DEFAULT: '#1C1C1E',
					foreground: '#F3F4F6'
				},
				card: {
					DEFAULT: '#1C1C1E',
					foreground: '#F3F4F6'
				},
				sidebar: {
					DEFAULT: '#0D0D0D',
					foreground: '#F3F4F6',
					primary: '#10B981',
					'primary-foreground': '#0D0D0D',
					accent: '#1C1C1E',
					'accent-foreground': '#F3F4F6',
					border: 'hsl(0 0% 11%)',
					ring: '#10B981'
				}
			},
			fontFamily: {
				display: ['Sora', 'sans-serif'],
				body: ['Inter', 'sans-serif'],
				sans: ['Inter', 'sans-serif'],
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
				},
				'pulse-glow': {
					"0%, 100%": {
						boxShadow: "0 0 5px #10B981"
					},
					"50%": {
						boxShadow: "0 0 20px #10B981"
					}
				},
				'float': {
					"0%, 100%": {
						transform: "translateY(0px)"
					},
					"50%": {
						transform: "translateY(-8px)"
					}
				},
				'neon-pulse': {
					"0%, 100%": {
						boxShadow: "0 0 5px #10B981, 0 0 10px #10B981, 0 0 15px #10B981"
					},
					"50%": {
						boxShadow: "0 0 10px #10B981, 0 0 20px #10B981, 0 0 30px #10B981"
					}
				},
				'cyber-glow': {
					"0%, 100%": {
						boxShadow: "0 0 5px #0EA5E9, 0 0 10px #0EA5E9"
					},
					"50%": {
						boxShadow: "0 0 10px #0EA5E9, 0 0 20px #0EA5E9, 0 0 25px #0EA5E9"
					}
				},
				'slide-in-left': {
					"0%": {
						transform: "translateX(-100%)",
						opacity: "0"
					},
					"100%": {
						transform: "translateX(0)",
						opacity: "1"
					}
				},
				'bounce-subtle': {
					"0%, 100%": {
						transform: "translateY(0)"
					},
					"50%": {
						transform: "translateY(-2px)"
					}
				},
				'shake-micro': {
					"0%, 100%": {
						transform: "translateX(0)"
					},
					"10%, 30%, 50%, 70%, 90%": {
						transform: "translateX(-1px)"
					},
					"20%, 40%, 60%, 80%": {
						transform: "translateX(1px)"
					}
				},
				'scale-pulse': {
					"0%, 100%": {
						transform: "scale(1)"
					},
					"50%": {
						transform: "scale(0.95)"
					}
				},
				'cascade': {
					"0%": {
						opacity: "0",
						transform: "translateY(20px)"
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
				'fade-in': 'fade-in 0.3s ease-out',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
				'cyber-glow': 'cyber-glow 2s ease-in-out infinite',
				'slide-in-left': 'slide-in-left 0.3s ease-out',
				'bounce-subtle': 'bounce-subtle 0.3s ease-in-out',
				'shake-micro': 'shake-micro 0.5s ease-in-out',
				'scale-pulse': 'scale-pulse 0.2s ease-out',
				'cascade': 'cascade 0.4s ease-out forwards'
			},
			letterSpacing: {
				'widest': '0.25em'
			},
			boxShadow: {
				'neon-green': '0 0 5px #10B981, 0 0 10px #10B981, 0 0 15px #10B981',
				'neon-blue': '0 0 5px #0EA5E9, 0 0 10px #0EA5E9, 0 0 15px #0EA5E9',
				'neon-red': '0 0 5px #EF4444, 0 0 10px #EF4444, 0 0 15px #EF4444',
				'cyber-glow': '0 0 10px rgba(14, 165, 233, 0.3), 0 0 20px rgba(14, 165, 233, 0.2)',
				'warion-glow': '0 0 15px rgba(16, 185, 129, 0.4), 0 0 30px rgba(16, 185, 129, 0.2)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
