<template>
  <v-container>
    <v-row>
      <v-col :cols="9">
        <v-text-field v-model="category" placeholder="Категорія" dense outlined/>
      </v-col>
      <v-col :cols="3">
        <v-btn block large @click="addCategory">Додати категорію</v-btn>
      </v-col>
    </v-row>
    <v-simple-table dark>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">
            Категорія
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="item in categories"
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
  name: 'RouteCategories',
  data: () => ({
    categories: [],
    category: null
  }),
  methods: {
    loadCategories() {
      axios.get('/admin/loadRouteCategories', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
          .then(res => {
            this.categories = res.data
          })
    },
    addRouteCategory() {
      axios.post('/admin/addRouteCategory',{title: this.category}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
          .then(() => {
            this.loadCategories()
          })
    }
  },
  mounted() {
    this.loadCategories();
  }
}
</script>
