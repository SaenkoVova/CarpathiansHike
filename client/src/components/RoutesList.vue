<template>
  <div>
      <v-row>
          <routes-list-item v-for="item in routes" :key="item.id" :route="item"></routes-list-item>
      </v-row>
  </div>
</template>

<script>

import RoutesListItem from '@/components/RoutesListItem';

export default {
    props: {
        'routes': {
            type: Array,
            required: true
        }
    },
    components: {
        RoutesListItem
    }
}
</script>

<style>

</style>