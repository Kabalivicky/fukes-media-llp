
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
			fontFamily: {
				'display': ['"Google Sans Display"', '"Google Sans"', 'Inter', 'system-ui', 'sans-serif'],
				'body': ['"Google Sans"', 'Inter', 'system-ui', 'sans-serif'],
				'mono': ['"Google Sans Mono"', 'ui-monospace', 'monospace'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				glow: {
					red: 'hsl(var(--glow-red))',
					blue: 'hsl(var(--glow-blue))',
					green: 'hsl(var(--glow-green))'
				},
				surface: {
					dim: 'hsl(var(--surface-dim))',
					bright: 'hsl(var(--surface-bright))',
					container: 'hsl(var(--surface-container))',
					'container-high': 'hsl(var(--surface-container-high))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'2xl': 'calc(var(--radius) + 8px)',
				'3xl': 'calc(var(--radius) + 16px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'marquee': {
					'0%': { transform: 'translateX(0%)' },
					'100%': { transform: 'translateX(-100%)' }
				},
				'marquee2': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0%)' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-in-right': {
					'0%': { opacity: '0', transform: 'translateX(10px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'pulse-soft': {
					'0%': { opacity: '1' },
					'50%': { opacity: '0.8' },
					'100%': { opacity: '1' }
				},
				'scale-up': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'slide-down': {
					'0%': { transform: 'translateY(-20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'shimmer': {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' }
				},
				'rgb-rotate': {
					'0%': { filter: 'hue-rotate(0deg)' },
					'100%': { filter: 'hue-rotate(360deg)' }
				},
				'gemini-glow': {
					'0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
					'50%': { opacity: '0.6', transform: 'scale(1.1)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'marquee': 'marquee 25s linear infinite',
				'marquee2': 'marquee2 25s linear infinite',
				'fade-in': 'fade-in 0.5s ease-out',
				'fade-in-right': 'fade-in-right 0.3s ease-out',
				'pulse-soft': 'pulse-soft 3s infinite',
				'scale-up': 'scale-up 0.5s ease-out',
				'slide-up': 'slide-up 0.5s ease-out',
				'slide-down': 'slide-down 0.5s ease-out',
				'shimmer': 'shimmer 2s infinite linear',
				'rgb-rotate': 'rgb-rotate 8s linear infinite',
				'gemini-glow': 'gemini-glow 4s ease-in-out infinite',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'gemini-gradient': 'linear-gradient(135deg, #C8102E, #0077B6, #00A651)',
				'shimmer-gradient': 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.08) 50%, transparent 100%)'
			},
			backgroundSize: {
				'shimmer': '200% 100%'
			},
			boxShadow: {
				'glow-red': '0 0 30px -5px hsl(354 87% 50% / 0.3)',
				'glow-blue': '0 0 30px -5px hsl(200 100% 45% / 0.3)',
				'glow-green': '0 0 30px -5px hsl(150 100% 40% / 0.3)',
				'material': '0 1px 3px 0 hsl(0 0% 0% / 0.1), 0 1px 2px -1px hsl(0 0% 0% / 0.1)',
				'material-lg': '0 10px 15px -3px hsl(0 0% 0% / 0.08), 0 4px 6px -4px hsl(0 0% 0% / 0.08)',
				'elevated': '0 20px 50px -12px hsl(0 0% 0% / 0.15)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
