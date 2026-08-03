<template>
  <div class="container">
    <div class="column-left">
      <h1 class="section-title">Blog</h1>
      <RouterLink to="/blog" class="section-title">&larr; All posts</RouterLink>
    </div>
    <div class="column-right">
      <div v-if="post" class="content">
        <h1>{{ post.title }}</h1>
        <p class="post-date">{{ formatDate(post.date) }}</p>
        <!-- Posts are Markdown files committed to this repository, never user
             input, so there is no untrusted HTML to sanitise here. -->
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div ref="body" class="post-body" v-html="html" />
      </div>
      <div v-else class="content">
        <h1>Post not found</h1>
        <p>
          There is no post at this address.
          <RouterLink to="/blog">Back to the blog</RouterLink>.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

import { findPost, formatDate } from "@/utils/posts";
import { renderMarkdown, typesetMath } from "@/utils/markdown";

const route = useRoute();
const body = ref(null);

const post = computed(() => findPost(route.params.slug));
const html = computed(() => renderMarkdown(post.value?.body));

// v-html injects plain HTML, which MathJax has already finished scanning for,
// so any formulas in the post have to be queued for typesetting by hand.
async function typeset() {
  await nextTick();
  typesetMath(body.value);
}

const siteTitle = document.title;

function updateTitle() {
  document.title = post.value
    ? `${post.value.title} — ${siteTitle}`
    : siteTitle;
}

onMounted(() => {
  typeset();
  updateTitle();
});

watch(html, () => {
  typeset();
  updateTitle();
});

onUnmounted(() => {
  document.title = siteTitle;
});
</script>

<style lang="less" scoped>
@import "@/assets/less/variables.less";

.post-date {
  color: @light-grey;
  font-size: 0.9em !important;
  margin-bottom: 25px !important;
}
</style>
