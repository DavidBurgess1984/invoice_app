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
        'primary': 'var(--primary)',
        'primary-light': 'var(--primary-light)',
        'nav-background': 'var(--nav-background)',
        'table-background': 'var(--table-background)',
        'secondary-font': 'var(--secondary-font)',
        'primary-darker': 'var(--primary-darker)',
        'panel-font': 'var(--panel-font)',
        'heading-font': 'var(--heading-font)',
        'cost-summary': 'var(--cost-summary)',
        'delete-bg': 'var(--delete-bg)',
        'delete-bg-hover': 'var(--delete-bg-hover)',
        'main-bg': 'var(--main-bg)',
        'back-btn': 'var(--back-btn)',
        'edit-btn':'var(--edit-bg)',
        'background':'rgb(var(--background))',
        'edit-form-bg': 'var(--edit-form-bg)',
        'edit-bg-hover': 'var(--edit-bg-hover)',
        'draft-bg-hover':'var(--draft-bg-hover)',
        'panel-bg':'var(--invoice-li)',
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
