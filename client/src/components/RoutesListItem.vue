<template>
  <v-col :md="6">
      <v-card
        class="mx-auto"
        max-width="100%"
    >
        <v-img
        :src="route.image"
        :height="250"
        ></v-img>

        <v-card-title>
            <router-link class="black--text" :tag="'span'" style="cursor: pointer;" :to="`/routes/${route.id}`">
                {{route.path}}
            </router-link>
        </v-card-title>

        <v-card-subtitle>
        <span>{{route.description}}</span>
        </v-card-subtitle>

        <v-card-actions>
        <v-btn
            color="orange"
            dark
            :to="`/routes/${route.id}`"
        >
            Детальніше
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn
            icon
            @click="show = !show"
        >
            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
        </v-card-actions>

        <v-expand-transition>
        <div v-show="show">
            <v-divider></v-divider>

            <v-card-text>
                <v-row class="font-weight-bold">
                    <v-col class="d-flex justify-center align-center">
                        <v-icon :size="40" class="mr-2">mdi-map-marker-path</v-icon>
                        <span>{{route.distance}} км</span>
                    </v-col>
                    <v-col class="d-flex justify-center align-center">
                        <v-icon :size="40" class="mr-2">mdi-clock-time-five</v-icon>
                        <span>{{route.duration}} год</span>
                    </v-col>
                    <v-col class="d-flex justify-center align-center">
                        <v-icon :size="40" class="mr-2">mdi-account-supervisor</v-icon>
                        <span>{{route.level}}</span>
                    </v-col>
                </v-row>
            </v-card-text>
            <div>
                <v-btn block color="orange" text>Показати ще фотографії</v-btn>
            </div>
        </div>
        </v-expand-transition>
    </v-card>
  </v-col>
</template>

<script>
export default {
    data: () => ({
        show: false
    }),
    props: {
        route: {
            type: Object,
            required: true
        }
    }
}
</script>

<style>

</style>