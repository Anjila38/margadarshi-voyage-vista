
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
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				
				// MargaDarshi custom colors
				cream: '#F1E9DD',
				'forest-green': '#2E4A3D',
				'sand-gold': '#D6A463',
				'muted-blue': '#9AB0B5',
				copper: '#B07F42',
				'off-black': '#1B1C1B',
				'off-white': '#F9F6F1',
				teal: '#246662',
				
				// Shadcn colors
				primary: {
					DEFAULT: '#2E4A3D', // forest-green
					foreground: '#F9F6F1' // off-white
				},
				secondary: {
					DEFAULT: '#F1E9DD', // cream
					foreground: '#1B1C1B' // off-black
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: '#F1E9DD', // cream
					foreground: '#2E4A3D' // forest-green
				},
				accent: {
					DEFAULT: '#D6A463', // sand-gold
					foreground: '#1B1C1B' // off-black
				},
				popover: {
					DEFAULT: '#F9F6F1', // off-white
					foreground: '#1B1C1B' // off-black
				},
				card: {
					DEFAULT: '#F9F6F1', // off-white
					foreground: '#1B1C1B' // off-black
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
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
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'fade-out': {
					'0%': {
						opacity: '1',
						transform: 'translateY(0)'
					},
					'100%': {
						opacity: '0',
						transform: 'translateY(10px)'
					}
				},
				'slide-in': {
					'0%': {
						opacity: '0',
						transform: 'translateX(-10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)'
					}
				},
				'scale-in': {
					'0%': {
						transform: 'scale(0.95)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				float: {
					'0%, 100%': {
						transform: 'translateY(0)',
					},
					'50%': {
						transform: 'translateY(-10px)',
					}
				},
				'spin-slow': {
					'0%': {
						transform: 'rotate(0deg)',
					},
					'100%': {
						transform: 'rotate(360deg)',
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'fade-out': 'fade-out 0.5s ease-out',
				'slide-in': 'slide-in 0.5s ease-out',
				'scale-in': 'scale-in 0.3s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'spin-slow': 'spin-slow 8s linear infinite',
			},
			typography: {
				DEFAULT: {
					css: {
						maxWidth: '65ch',
						color: '#1B1C1B',
						p: {
							lineHeight: '1.75',
						},
						h1: {
							fontWeight: '700',
						},
						h2: {
							fontWeight: '700',
						},
						h3: {
							fontWeight: '600',
						},
						'h4,h5,h6': {
							fontWeight: '600',
						},
					},
				},
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
