/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    darkMode: ['class', '[data-theme="dark"]'], // Matches your data-theme logic
    theme: {
        extend: {
            colors: {
                background: 'var(--color-background)',
                foreground: 'var(--color-foreground)',
                accent: 'var(--color-accent)',
                border: 'var(--color-border)',
                muted: 'var(--color-muted)',
            },
            fontFamily: {
                app: ['var(--font-app)', 'monospace'],
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'), // This powers the "prose" classes in your theme
    ],
};