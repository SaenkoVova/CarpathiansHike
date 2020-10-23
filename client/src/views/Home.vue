<template>
  <div class="home">
    <app-intro></app-intro>
    <site-description></site-description>
    <services></services>
  </div>
</template>

<script>

import AppIntro from '@/components/AppIntro';
import SiteDescription from '@/components/SiteDescription';
import Services from '@/components/Services';

export default {
  name: 'Home',
  components: {
    AppIntro,
    Services,
    SiteDescription
  }
}

</script>

<style scoped>
  
</style>