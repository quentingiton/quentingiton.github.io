<template>
    <div>
      <!-- Conditionally render components based on whether their JSON files are empty or not -->
      <TeachingComponent v-if="!isCoursesEmpty" id="teaching"/>
      <PublicationsComponent v-if="!isPublisEmpty" id="publications"/>
    </div>
  </template>
  
  <script>
  import TeachingComponent from "../components/TeachingComponent.vue";
  import courses from '../../dist/teaching/courses.json';

  import PublicationsComponent from "./PublicationsComponent.vue";
  import publis from '../../dist/publications/publications.json';
  
  export default {
    components: {
      TeachingComponent,
      PublicationsComponent,
    },
    data() {
      return {
        isCoursesEmpty: true,
        isPublisEmpty: true,
      };
    },
    created() {
      this.checkInfos();
    },
    methods: {
      checkInfos() {
        // Check if each JSON file is empty
        this.isCoursesEmpty = !courses || Object.keys(courses).length === 0;
        this.isPublisEmpty = !publis || Object.keys(publis).length ===0;
      }
    }
  }
  </script>
