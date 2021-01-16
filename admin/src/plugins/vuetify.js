import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import theme from './theme';
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark: theme
    },
    icons: {
        iconfont: 'mdi'
    }
});
