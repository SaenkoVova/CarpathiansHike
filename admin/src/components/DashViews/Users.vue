<template>
  <v-container>
    <v-simple-table dark>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Calories
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="user in users"
            :key="user._id"
        >
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
  import axios from "axios";

  export default {
    name: 'Users',
    data: () => ({
      users: []
    }),
    methods: {
      loadUsers() {
        axios.get('/admin/loadUsers', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
          .then(res => {
            this.users = res.data
          })
      }
    },
    mounted() {
      this.loadUsers();
    }
  }
</script>
