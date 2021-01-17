<template>
  <transition mode="out-in">
    <router-view />
  </transition>    
</template>

<script>


export default {
  name: 'App',
  created() {
    this.$http.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if(error.response.status === 401) {
          this.$store.dispatch('logout').then(() => {
            this.$router.push('/')
          })
        } else {
          return Promise.reject(error);
        }
      }
    )
  }
};
</script>
