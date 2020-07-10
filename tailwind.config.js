module.exports = {
  prefix: 'tw-',
  purge: [],
  theme: {
    extend: {
      fontSize: {
        '10xl': '8rem',
      },
      height: {
        '17': '4.25rem',
        '112': '28rem',
        '125': '31.25rem',
      },
      width: {
        '59': '14.75rem',
        '65': '16.25rem',
        'content': 'calc(100% - 240px)'
      },
      maxWidth: {
        '288': '72rem',
      },
      minWidth: {
        '20': '5rem',
      },
      colors: {
        primary: '#ff9800',
        secondary: '#4caf50',
        accent: '#242145',
        error: '#f44336',
        success: '#4caf50',
        danger: '#f44336',
        warning: '#ef6c00',
        dark: '#3b3671',
        light: '#e8eaf1'
      },
      inset: {
        '3': '0.75rem',
        '24': '6rem'
      },
      boxShadow: {
        'lg-r': '15px 0px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
      }
    },
    fontFamily: {
      'roboto': ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
    },
  },
  variants: {},
  plugins: [],
}
