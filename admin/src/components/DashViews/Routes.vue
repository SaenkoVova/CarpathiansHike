<template>
  <v-container>
    <v-row>
      <v-col :cols="4">
        <v-select
            @change="setStartLocation"
            :items="locations"
            label="Оберіть початок маршруту"
            outlined
        ></v-select>
      </v-col>
      <v-col :cols="4">
        <v-select
            @change="setEndLocation"
            :items="locations"
            label="Оберіть кінець маршруту"
            outlined
        ></v-select>
      </v-col>
      <v-col :cols="4">
        <v-select
            @change="setCategory"
            :items="categories"
            label="Оберіть категорію"
            outlined
        ></v-select>
      </v-col>
      <v-col :cols="4">
        <v-text-field v-model="path" placeholder="Вкажіть шлях" outlined/>
      </v-col>
      <v-col :cols="4">
        <v-text-field v-model="previewImage" placeholder="Вкажіть зображення маршруту" outlined/>
      </v-col>
      <v-col :cols="4">
        <v-text-field v-model="geoJson" placeholder="Вкажіть geo json" outlined/>
      </v-col>
      <v-col :cols="4">
        <v-text-field v-model="distance" placeholder="Вкажіть довжину маршруту" outlined/>
      </v-col>
      <v-col :cols="4">
        <v-text-field v-model="level" placeholder="Вкажіть складність маршруту" outlined/>
      </v-col>
      <v-col :cols="4">
        <v-text-field v-model="description" placeholder="Вкажіть опис маршруту" outlined/>
      </v-col>
      <v-col :cols="4">
        <v-text-field v-model="duration" placeholder="Вкажіть тривалість маршруту" outlined/>
      </v-col>
      <v-col :cols="4">
        <v-btn @click="addRoute">Додати маршрут</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
  import axios from "axios";

  export default {
    name: 'Routes',
    data: () => ({
      locations: null,
      path: null,
      previewImage: null,
      images: [],
      geoJson: null,
      start: null,
      end: null,
      distance: null,
      level: null,
      description: null,
      routeCategoriesId: null,
      duration: null,
      routePeaks: [],
      routeInteresting: [],
      nearestPlaces: [],
      allowReview: false,
      startLocationId: null,
      endLocationId: null,
      categoryId: null,
      categories: []
    }),
    methods: {
      addRoute() {
        axios.post('/admin/addRoute', {
          path: this.path,
          previewImage: this.previewImage,
          images: [],
          geoJson: this.geoJson,
          start: this.startLocationId,
          end: this.endLocationId,
          distance: this.distance,
          level: this.level,
          description: this.description,
          routeCategoriesId: this.categoryId,
          duration: this.duration,
          routePeaks: [],
          routeInteresting: [],
          nearestPlaces: [],
          allowReview: true
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
            .then(res => {
              console.log(res)
            })
      },
      loadCategories() {
        axios.get('/admin/loadRouteCategories', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
            .then(res => {
              this.categories = res.data.map(i => i.title + ', ' + i._id)
            })
      },
      loadLocations() {
        axios.get('/admin/loadLocations', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
            .then(res => {
              this.locations = res.data.map(i => i.title + ',' + i._id)
            })
      },
      setStartLocation(event) {
        this.startLocationId = event.split(',')[1].trim()
      },
      setEndLocation(event) {
        this.endLocationId = event.split(',')[1].trim()
      },
      setCategory(event) {
        this.categoryId = event.split(',')[1].trim()
      }
    },
    mounted() {
      this.loadLocations();
      this.loadCategories();
    }
  }
</script>
