<template>
  <v-container>
    <v-row>
      <v-col :cols="4">
        <v-select
            @change="setCategory"
            :items="categories"
            label="Оберіть категорію"
            outlined
        ></v-select>
      </v-col>
      <v-col :cols="4">
        <v-select
            @change="setMassif"
            :items="massifs"
            label="Оберіть гірський массив"
            outlined
        ></v-select>
      </v-col>
      <v-col :cols="4">
        <v-text-field v-model="title" placeholder="Назва локації" outlined/>
      </v-col>
      <v-col :cols="4">
        <v-text-field v-model="info" placeholder="Опис локації" outlined/>
      </v-col>
      <v-col :cols="4">
        <v-text-field v-model="height" placeholder="Висота над рівнем моря" outlined/>
      </v-col>
      <v-col :cols="4">
        <v-text-field v-model="lt" placeholder="Широта" outlined/>
      </v-col>
      <v-col :cols="4">
        <v-text-field v-model="lg" placeholder="Довгота" outlined/>
      </v-col>
      <v-col :cols="4">
        <v-text-field v-model="previewImage" placeholder="Зображення" outlined/>
      </v-col>
      <v-col :cols="4">
        <v-checkbox
            v-model="allowReview"
            label="Дозволити відгуки"
        ></v-checkbox>
      </v-col>
      <v-col :cols="4">
        <v-checkbox
            v-model="transportHub"
            label="Транспортний вузол"
        ></v-checkbox>
      </v-col>
      <v-col :cols="4">
        <v-checkbox
            v-model="railwayConnection"
            label="Залізничне сполучення"
        ></v-checkbox>
      </v-col>
      <v-col :cols="4">
        <v-checkbox
            v-model="tourCity"
            label="Туристичне місто"
        ></v-checkbox>
      </v-col>
      <v-col :cols="4">
        <v-checkbox
            v-model="publicTransport"
            label="Публічний транспорт"
        ></v-checkbox>
      </v-col>
      <v-col :cols="4">
        <v-btn @click="addLocation">Додати локацію</v-btn>
      </v-col>
    </v-row>
    <v-simple-table dark>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">
            Гірський массив
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="item in massifs"
            :key="item._id"
        >
          <td>{{ item.title }}</td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: 'Massif',
  data: () => ({
    massifs: [],
    categories: [],
    categoryId: null,
    massifId: null,
    title: null,
    info: null,
    height: null,
    transportHub: false,
    railwayConnection:  false,
    tourCity: false,
    publicTransport: false,
    lt: null,
    lg: null,
    allowReview: false,
    previewImage: null,
    nearestSettlements: [],
    routes: [],
    reviews: [],
    images: []
  }),
  methods: {
    setCategory(event) {
      console.log(event)
      this.categoryId = event.split(',')[1].trim()
    },
    setMassif(event) {
      this.massifId = event.split(',')[1].trim()
      console.log(this.massifId)
    },
    addLocation() {
      axios.post('/admin/addLocation', {
        massifId: this.massifId,
        categoryId: this.categoryId,
        title: this.title,
        info: this.info,
        height: this.height,
        transportHub: this.transportHub,
        railwayConnection: this.railwayConnection,
        tourCity: this.tourCity,
        publicTransport: this.publicTransport,
        lt: this.lt,
        lg: this.lg,
        allowReview: this.allowReview,
        previewImage: this.previewImage,
        nearestSettlements: this.nearestSettlements,
        routes: this.routes,
        reviews: this.reviews,
        images: this.images
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(res => {
          console.log(res)
        })
    },
    loadMassifs() {
      axios.get('/admin/loadMassifs', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
          .then(res => {
            this.massifs = res.data.map(i => i.title + ', ' + i._id)
          })
    },
    loadCategories() {
      axios.get('/admin/loadCategories', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
          .then(res => {
            this.categories = res.data.map(i => i.title + ', ' + i._id)
          })
    },
  },
  mounted() {
    this.loadMassifs();
    this.loadCategories();
  }
}
</script>
