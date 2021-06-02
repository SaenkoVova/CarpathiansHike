<template>
  <v-container>
    <v-row>
      <v-col :cols="9">
        <v-text-field v-model="massif" placeholder="Гірський массив" dense outlined/>
      </v-col>
      <v-col :cols="3">
        <v-btn block large @click="addMassif">Додати массив</v-btn>
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
    massif: null
  }),
  methods: {
    loadMassifs() {
      axios.get('/admin/loadMassifs', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
          .then(res => {
            this.massifs = res.data
          })
    },
    addMassif() {
      axios.post('/admin/addMassif',{title: this.massif}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
          .then(() => {
            this.loadMassifs();
          })
    }
  },
  mounted() {
    this.loadMassifs();
  }
}
</script>
