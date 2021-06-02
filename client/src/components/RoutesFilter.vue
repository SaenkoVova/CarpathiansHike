<template>
  <v-row>
      <v-col>
          <v-select
          @change="setDuration"
          :items="durations"
          label="Тривалість"
          solo
        ></v-select>
      </v-col>
      <v-col>
          <v-select
          @change="setLevel"
          :items="['легка', 'середня', 'складна']"
          label="Складність"
          solo
        ></v-select>
      </v-col>
      <v-col>
          <v-select
          :items="['Чорногора']"
          label="Масив"
          solo
        ></v-select>
      </v-col>
<!--      <v-col>-->
<!--&lt;!&ndash;          <v-btn block dark large color="orange">Фільтр</v-btn>&ndash;&gt;-->
<!--      </v-col>-->
<!--      <v-col>-->
<!--          <v-btn-->
<!--      -->
<!--      fab-->
<!--      dark-->
<!--      small-->
<!--      color="red"-->
<!--    >-->
<!--      <v-icon dark>-->
<!--        mdi-close-->
<!--      </v-icon>-->
<!--    </v-btn>-->
<!--      </v-col>-->
  </v-row>
</template>

<script>
import Axios from "axios";
import proxy from "@/proxy";

export default {
    data: () => ({
      durations: [],
      duration: null,
      rules: [
        value => (value && value.length >= 3) || 'Мінімум 3 знаки',
      ]
    }),
    methods: {
      setDuration(event) {
        this.$emit('loadByDuration', event)
      },
      setLevel(event) {
        this.$emit('loadByLevel', event)
      },
      loadRoutesDurations() {
        Axios.get(`${proxy.domen}/routes/loadRoutesDurations`)
          .then(res => {
            this.durations = res.data.map(i => i.duration)
          })
      }
    },
    mounted() {
      this.loadRoutesDurations();
    }
}
</script>

<style>

</style>
