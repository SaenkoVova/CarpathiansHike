<template>
  <v-app-bar
    id="core-toolbar"
    app>
        <v-toolbar-title class="font-weight-light text-general">
        <v-btn
            v-if="responsive"
            class="default v-btn--simple"
            icon
            @click.stop="onClickBtn">
            <v-icon>mdi-view-list</v-icon>
        </v-btn>
        {{ title }}
        </v-toolbar-title>

        <v-spacer/>
        <v-toolbar-items>
            <v-flex
                align-center
                layout
                px-5>
                <v-text-field
                    v-if="responsiveInput"
                    class="mr-4 mt-2 purple-input"
                    label="Пошук..."
                    hide-details
                    color="purple"/>
                <v-btn fab depressed to="/">
                    <v-icon>mdi-home</v-icon>
                </v-btn>
                <v-btn fab depressed to="/dashboard/user-profile">
                    <v-icon>mdi-account</v-icon>
                </v-btn>
                <v-btn @click="logout" small fab :color="this.$vuetify.theme.themes.dark.error">
                    <v-icon>mdi-power</v-icon>
                </v-btn>
            </v-flex>
        </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  data: () => ({
    notifications: [
      'Mike, Thanos is coming',
      '5 new avengers joined the team',
      "You're now friends with Capt",
      'Another Notification',
      'Another One - Dj Khalid voice'
    ],
    title: 'Панель керування',
    responsive: false,
    responsiveInput: false
  }),

  computed: {
    ...mapGetters(['authorized'])
  },

  watch: {
    $route (val) {
      this.title = val.meta.name
    }
  },

  mounted () {
    this.onResponsiveInverted()
    window.addEventListener('resize', this.onResponsiveInverted)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResponsiveInverted)
  },

  methods: {
    ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
    onClickBtn () {
      this.setDrawer(!this.$store.state.app.drawer)
    },
    onClick () {
      //
    },
    onResponsiveInverted () {
      if (window.innerWidth < 991) {
        this.responsive = true
        this.responsiveInput = false
      } else {
        this.responsive = false
        this.responsiveInput = true
      }
    },
    logout: function () {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>

<style>
	#core-toolbar a {
		text-decoration: none;
	}
</style>
