<template>
  <div>
    <!-- Conditionally render components based on whether their JSON files are empty or not -->
    <TeachingComponent
      v-if="!isCoursesEmpty"
      id="teaching"
      :courses="courses"
    />
    <PublicationsComponent
      v-if="!isPublisEmpty"
      id="publications"
      :publis="publis"
    />
  </div>
</template>

<script>
import TeachingComponent from "./TeachingComponent.vue";
import courses from "@/assets/json/teaching.json";

import PublicationsComponent from "./PublicationsComponent.vue";
import publis from "@/assets/json/publications.json";

export default {
  components: {
    TeachingComponent,
    PublicationsComponent,
  },
  data() {
    return {
      courses,
      isCoursesEmpty: true,
      publis,
      isPublisEmpty: true,
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
    },
  },
};

function isEmpty(arr) {
  return !arr || Object.keys(arr).length === 0;
}
</script>
