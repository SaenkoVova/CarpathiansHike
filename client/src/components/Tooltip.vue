<template>
  <div>
    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          :color="'orange'"
          dark
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>{{icon}}</v-icon>
        </v-btn>
      </template>
      <span>{{description}}</span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
    props: {
        'icon': {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    }
}
</script>