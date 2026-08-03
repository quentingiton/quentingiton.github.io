<template>
  <!-- Conditionally render components based on whether their JSON files are empty or not -->
  <PublicationsComponent
    v-if="!isPublisEmpty"
    id="publications"
    :publis="publis"
  />
  <TeachingComponent
    v-if="!isCoursesEmpty"
    id="teaching"
    :courses="courses" />
  <TalksComponent
    v-if="!isTalksEmpty"
    id="talks"
    :talks="talks"
  />
  <ShortNotesComponent
    v-if="!isNotesEmpty"
    id="notes"
    :notes="notes"
  />
  <BlogComponent
    v-if="!isPostsEmpty"
    id="blog"
    :posts="posts"
  />
</template>

<script>
import PublicationsComponent from "./PublicationsComponent.vue";
import publis from "@/assets/json/publications.json";

import TeachingComponent from "./TeachingComponent.vue";
import courses from "@/assets/json/teaching.json";

import TalksComponent from "./TalksComponent.vue";
import talks from "@/assets/json/talks.json";

import ShortNotesComponent from "./ShortNotesComponent.vue";
import notes from "@/assets/json/notes.json";

import BlogComponent from "./BlogComponent.vue";
import { posts } from "@/utils/posts";

export default {
  components: {
    PublicationsComponent,
    TeachingComponent,
    TalksComponent,
    ShortNotesComponent,
    BlogComponent,
  },
  data() {
    return {
      publis,
      isPublisEmpty: true,
      courses,
      isCoursesEmpty: true,
      talks,
      isTalksEmpty: true,
      notes,
      isNotesEmpty: true,
      posts,
      isPostsEmpty: true,
    };
  },
  created() {
    this.checkInfos();
  },
  methods: {
    checkInfos() {
      // Check if each JSON file is empty
      this.isPublisEmpty = isEmpty(publis);
      this.isCoursesEmpty = isEmpty(courses);
      this.isTalksEmpty = isEmpty(talks);
      this.isNotesEmpty = isEmpty(notes);
      this.isPostsEmpty = isEmpty(posts);
    },
  },
};

function isEmpty(arr) {
  return !arr || Object.keys(arr).length === 0;
}
</script>
