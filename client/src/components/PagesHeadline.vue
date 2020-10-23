<template>
  <div>
      <h1 class="headline mt-5 mb-5">{{headline}}</h1>
  </div>
</template>

<script>
export default {
    props: {
        'headline': {
            type: String,
            required: true
        }
    }
}
</script>

<style>

</style>