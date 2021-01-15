<template>
    <v-alert
      dense
      text
      :type="type"
    >
      {{message}}
    </v-alert>
</template>

<script>
export default {
    props: {
        'message': {
            type: String,
            required: true
        },
        'type': {
            type: String,
            required: true
        }
    }
}
</script>

<style>

</style>