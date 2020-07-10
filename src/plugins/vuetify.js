import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#ff9800',
        secondary: '#4caf50',
        accent: '#242145',
        error: '#f44336',
        success: '#4caf50',
        danger: '#f44336',
        warning: '#ef6c00',
        dark: '#3b3671',
        light: '#e8eaf1'
      }
    }
  },
});
