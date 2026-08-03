<template>
  <div class="container">
    <div class="column-left">
      <h1 class="section-title">Blog</h1>
    </div>
    <div class="column-right">
      <div class="content">
        <div class="info-box">
          <i class="fas fa-circle-info" />
          <p>
            You can find all the posts
            <RouterLink to="/blog">here</RouterLink>
          </p>
        </div>
        <PostComponent
          v-for="post in recentPosts"
          :key="post.id"
          :post="post"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import PostComponent from "./PostComponent.vue";

const props = defineProps({
  posts: {
    type: Array,
    default(rawProps) {
      return [];
    },
  },
});

// Already sorted newest first by the posts module.
const recentPosts = props.posts.slice(0, 4);
</script>
