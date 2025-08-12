/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
        keyframes: {
            eq1: { '0%,100%': { transform: 'scaleY(.35)' }, '50%': { transform: 'scaleY(.95)' } },
            eq2: { '0%,100%': { transform: 'scaleY(.65)' }, '50%': { transform: 'scaleY(.25)' } },
            eq3: { '0%,100%': { transform: 'scaleY(.45)' }, '50%': { transform: 'scaleY(.85)' } },
        },
        animation: {
            eq1: 'eq1 .9s ease-in-out infinite',
            eq2: 'eq2 .9s ease-in-out infinite .15s',
            eq3: 'eq3 .9s ease-in-out infinite .3s',
        },
        },
    },
}
