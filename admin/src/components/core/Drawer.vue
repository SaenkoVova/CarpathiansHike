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
                <v-list-item-title>В похід Карпатами</v-list-item-title>
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
                <v-list-item-content v-if="link.subItems">
                    <v-expansion-panels flat style="background: transparent; padding-left: 0;">
                        <v-expansion-panel style="background: transparent; padding-left: 0;">
                            <v-expansion-panel-header style="background: transparent; padding-left: 0;">
                                Таблиці
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-list>
                                    <v-list-item v-for="(subItem, i) in link.subItems" :key="i" :to="subItem.to">
                                        <v-list-item-title>
                                            {{subItem.text}}
                                        </v-list-item-title>
                                    </v-list-item>   
                                </v-list>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-list-item-content>
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
                to: '/',
                icon: 'mdi-view-dashboard',
                text: 'Головна'
            },
            {
                to: '',
                icon: 'mdi-table-of-contents',
                text: '',
                subItems: [
                    {
                        to: '/',
                        text: 'Користувачі'
                    }
                ]
            },
            {
                to: '/dashboard/table-list',
                icon: 'mdi-clipboard-outline',
                text: 'Table List'
            },
            {
                to: '/dashboard/user-tables',
                icon: 'mdi-table-edit',
                text: 'Users Table'
            },
            {
                to: '/dashboard/typography',
                icon: 'mdi-format-font',
                text: 'Typography'
            },
            {
                to: '/dashboard/icons',
                icon: 'mdi-chart-bubble',
                text: 'Icons'
            },
            {
                to: '/dashboard/maps',
                icon: 'mdi-map-marker',
                text: 'Maps'
            },
            {
                to: '/dashboard/notifications',
                icon: 'mdi-bell',
                text: 'Notifications'
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