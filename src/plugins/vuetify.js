import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
    theme: {
        themes: {
          light: {
            primary: '#BB86FC',
            secondary: '#242424',
            accent: '#8c9eff',
            error: '#b71c1c',
          },
        },
      },
});
