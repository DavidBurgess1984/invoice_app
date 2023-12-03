import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'inv-7C5DFA': 'var(--primary)',
        'inv-9277FF': 'var(--primary-light)',
        'inv-1E2139': 'var(--nav-background)',
        'inv-DFE3FA': 'var(--table-background)',
        'inv-888EB0': 'var(--secondary-font)',
        'inv-7E88C3': 'var(--primary-darker)',
        'inv-panel': 'var(--panel-font)',
        'inv-0C0E16': 'var(--heading-font)',
        'inv-cost-summary': 'var(--cost-summary)',
        'inv-EC5757': 'var(--delete-bg)',
        'inv-FF9797': 'var(--delete-bg-hover)',
        'inv-F8F8FB': 'var(--main-bg)',
        'inv-F9FAFE': 'var(--back-btn)',
        'inv-edit-btn':'var(--edit-bg)',
        'inv-bg':'rgb(var(--background))',
        'edit-form-bg': 'var(--edit-form-bg)',
        'edit-bg-hover': 'var(--edit-bg-hover)',
        'draft-bg-hover':'var(--draft-bg-hover)',
        'inv-li':'var(--invoice-li)',
        'success-font':'var(--success-font)',
        'pending-font':'var(--pending-font)',
        'draft-font':'var(--draft-font)',
        'success-bg':'var(--success-bg)',
        'pending-bg':'var(--pending-bg)',
        'draft-bg':'var(--draft-bg)',
        'lightbox-bg':'var(--lightbox-bg)'
      },
    },
    fontFamily:{
      'LeagueSpartan' :['League Spartan','sans']
    },
    maxWidth: {
      '1200': '1200px',
    },
  },
  plugins: [],
}
export default config
