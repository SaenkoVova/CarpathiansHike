<template>
    <v-navigation-drawer app dark
        mobile-breakpoint="991"
        width="260"
        >
        <v-list-item>
            <v-list-item-avatar>
                <v-img src="https://i2.rozetka.ua/goods/2284114/24735816_images_2284114400.jpg"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title>В мандри Карпатами</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list
            nav
            dense>
            <v-list-item class="d-flex align-start"
                v-for="(link, i) in links"
                :key="i"
                :to="link.to"
                :active-class="color">
                <v-list-item-action>
                    <v-icon>{{link.icon}}</v-icon>
                </v-list-item-action>
                <v-list-item-title v-if="link.text" v-text="link.text" />
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    data: () => ({
        links: [
          {
            to: '/dashboard',
            icon: 'mdi-table-edit',
            text: 'Дашборд'
          },
          {
            to: '/users',
            icon: 'mdi-table-edit',
            text: 'Користувачі'
          },
          {
            to: '/place-categories',
            icon: 'mdi-table-edit',
            text: 'Категорії'
          },
          {
            to: '/massif',
            icon: 'mdi-table-edit',
            text: 'Гірські масиви'
          },
          {
            to: '/locations',
            icon: 'mdi-table-edit',
            text: 'Локації'
          },
          {
            to: '/routes',
            icon: 'mdi-table-edit',
            text: 'Маршрути'
          },
          {
            to: '/routes-categories',
            icon: 'mdi-table-edit',
            text: 'Категорії маршрутів'
          },
          {
            to: '/dashboard/reporting',
            icon: 'mdi-file-chart',
            text: 'Звіти'
          }
        ],
        responsive: false
    }),
    computed: {
        ...mapState('app', ['color']),
        inputValue: {
            get() {
                return this.$store.state.app.drawer
            },
            set(val) {
                this.setDrawer(val)
            }
        }
    },
    mounted () {
        this.onResponsiveInverted();
        window.addEventListener('resize', this.onResponsiveInverted);
    },
    beforeDestroy () {
        window.removeEventListener('resize', this.onResponsiveInverted)
    },
    methods: {
        ...mapActions('app', ['setDrawer', 'toggleDrawer']),
        onResponsiveInverted () {
            if(window.innerWidth < 991) {
                this.responsive = true;
            } else {
                this.responsive = false;
            }
        }
    }
}
</script>

<style>

</style>
