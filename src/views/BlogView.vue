<template>
  <div class="container">
    <div class="column-left">
      <h1 class="section-title">Blog</h1>
    </div>
    <div class="column-right">
      <div class="content">
        <PostComponent v-for="post in posts" :key="post.id" :post="post" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { posts } from "@/utils/posts";
import PostComponent from "@/components/PostComponent.vue";
</script>
