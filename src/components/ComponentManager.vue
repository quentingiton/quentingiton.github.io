<template>
    <div>
      <!-- Conditionally render components based on whether their JSON files are empty or not -->
      <TeachingComponent v-if="!isCoursesEmpty" id="teaching"/>
    </div>
  </template>
  
  <script>
  import TeachingComponent from "../components/TeachingComponent.vue";
  
  import courses from '../../dist/teaching/courses.json';
  
  export default {
    components: {
      TeachingComponent,
    },
    data() {
      return {
        isCoursesEmpty: true,
      };
    },
    created() {
      this.checkInfos();
    },
    methods: {
      checkInfos() {
        // Check if each JSON file is empty
        this.isCoursesEmpty = !courses || Object.keys(courses).length === 0;
      }
    }
  }
  </script>
