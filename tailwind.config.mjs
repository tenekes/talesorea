import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    darkMode: ['class', '[data-theme="dark"]'],
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
                // This makes Inter the absolute default for all standard text and Prose
                sans: ['Inter', 'sans-serif'],
                // Kept your custom app variable intact
                app: ['var(--font-app)', 'monospace'],
                // Optional: A clean fallback for code blocks if you still have any
                mono: ['IBM Plex Mono', 'monospace'],
            },
        },
    },
    plugins: [
        typography,
    ],
};