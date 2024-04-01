/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{tsx,scss}"],
	theme: {
		extend: {
			colors: {
				transparent: "transparent",
				current: "currentColor",
				primary: "hsl(var(--color-primary) / <alpha-value>)",
				secondary: "hsl(var(--color-secondary) / <alpha-value>)",
			},
		},
	},
	plugins: [],
};
