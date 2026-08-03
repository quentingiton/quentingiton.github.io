<template>
  <div class="course-item">
    <div class="title-with-buttons">
      <h2>
        <RouterLink :to="`/blog/${post.slug}`">{{ post.title }}</RouterLink>
      </h2>
    </div>
    <div class="text-container">
      <p v-if="post.summary">{{ post.summary }}</p>
    </div>
    <div class="course-meta">
      <span>{{ formatDate(post.date) }}</span>
    </div>
  </div>
</template>

<script setup>
import { formatDate } from "@/utils/posts";

const props = defineProps({
  post: {
    type: Object,
    default(rawProps) {
      return {};
    },
  },
});
</script>
