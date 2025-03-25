<template>
  <header>
    <nav id="desktop-nav">
      <div class="logo"><RouterLink to="/">Quentin Giton</RouterLink></div>
      <div class="nav-links">
        <RouterLink to="/teaching" active-class="link-active"
        v-if="!isCoursesEmpty"
        id="teaching"
        :courses="courses"
          >Teaching</RouterLink
        >
        <RouterLink to="/publications" active-class="link-active"
        v-if="!isPublisEmpty"
        id="publications"
        :publis="publis"  
          >Publications</RouterLink
        >
        <RouterLink to="/notes" active-class="link-active"
        v-if="!isNotesEmpty"
        id="notes"
        :notes="notes"
          >Notes</RouterLink
        >
        <RouterLink to="/"><i class="fas fa-house"></i></RouterLink>
      </div>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<script>
import TeachingComponent from "./components/TeachingComponent.vue";
import courses from "@/assets/json/teaching.json";

import PublicationsComponent from "./components/PublicationsComponent.vue";
import publis from "@/assets/json/publications.json";

import ShortNotesComponent from "./components/ShortNotesComponent.vue";
import notes from "@/assets/json/notes.json";

export default {
  components: {
    TeachingComponent,
    PublicationsComponent,
    ShortNotesComponent,
  },
  data() {
    return {
      courses,
      isCoursesEmpty: true,
      publis,
      isPublisEmpty: true,
      notes,
      isNotesEmpty: true,
    };
  },
  created() {
    this.checkInfos();
  },
  methods: {
    checkInfos() {
      // Check if each JSON file is empty
      this.isCoursesEmpty = isEmpty(courses);
      this.isPublisEmpty = isEmpty(publis);
      this.isNotesEmpty = isEmpty(notes);
    },
  },
};

function isEmpty(arr) {
  return !arr || Object.keys(arr).length === 0;
}
</script>