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
    },
  },
};

function isEmpty(arr) {
  return !arr || Object.keys(arr).length === 0;
}
</script>
