<template>
  <div>
    <!-- <v-btn :to="'/admin'"> Button </v-btn> -->
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  mounted(){
    this.$router.replace("/admin");
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
