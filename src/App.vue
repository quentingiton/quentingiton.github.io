<template>
  <header>
    <nav id="desktop-nav">
      <div class="logo"><RouterLink to="/">Quentin Giton</RouterLink></div>
      <div class="nav-links">
        <RouterLink to="/publications" active-class="link-active"
        v-if="!isPublisEmpty"
        id="publications"
        :publis="publis"  
          >Publications</RouterLink
        >
        <RouterLink to="/teaching" active-class="link-active"
        v-if="!isCoursesEmpty"
        id="teaching"
        :courses="courses"
          >Teaching</RouterLink
        >
        <RouterLink to="/talks" active-class="link-active"
        v-if="!isTalksEmpty"
        id="talks"
        :talks="talks"  
          >Talks</RouterLink
        >
        <RouterLink to="/notes" active-class="link-active"
        v-if="!isNotesEmpty"
        id="notes"
        :notes="notes"
          >Notes</RouterLink
        >
        <RouterLink to="/blog" active-class="link-active" v-if="!isPostsEmpty"
          >Blog</RouterLink
        >
        <RouterLink to="/scripts" active-class="link-active">Scripts</RouterLink>
        <RouterLink to="/"><i class="fas fa-house"></i></RouterLink>
      </div>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<script>
import PublicationsComponent from "./components/PublicationsComponent.vue";
import publis from "@/assets/json/publications.json";

import TeachingComponent from "./components/TeachingComponent.vue";
import courses from "@/assets/json/teaching.json";

import TalksComponent from "./components/TalksComponent.vue";
import talks from "@/assets/json/talks.json";

import ShortNotesComponent from "./components/ShortNotesComponent.vue";
import notes from "@/assets/json/notes.json";

import { posts } from "@/utils/posts";

export default {
  components: {
    PublicationsComponent,
    TeachingComponent,
    TalksComponent,
    ShortNotesComponent,
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