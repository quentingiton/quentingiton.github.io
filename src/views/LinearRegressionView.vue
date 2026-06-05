<template>
  <div class="container">
    <div class="column-left">
      <h1 class="section-title">Linear Regression</h1>
      <br>
      <RouterLink to="/scripts" class="back-link">
        <i class="fas fa-arrow-left"></i> Back to the scripts
      </RouterLink>
    </div>
    
    <div class="column-right">
      <div class="content">
        <p>Adjust the under parameters or clic on the Optimise! button to visualise the minimisation of the Mean Square Error (MSE) in live-action!</p>
        
        <LinearRegression />
        
      </div>
    </div>
  </div>
</template>

<script setup>
import LinearRegression from '@/components/LinearRegression.vue';
</script>

<style lang="less" scoped>
@import "@/assets/less/variables.less";

.back-link {
  color: @text-color;
  text-decoration: none;
  font-weight: bold;
  font-size: 0.9rem;
  transition: opacity 0.2s;
}

.back-link:hover {
  opacity: 0.7;
}
</style>