<template>
    <div>
      <!-- Conditionally render components based on whether their JSON files are empty or not -->
      <TeachingComponent v-if="!isCoursesEmpty" id="teaching"/>
      <ConferencesComponent v-if="!isConferencesEmpty" id="conferences"/>
      <TalksComponent v-if="!isTalksEmpty" id="talks"/>
      <PublicationsComponent v-if="!isPublicationsEmpty"  id="publications"/>
    </div>
  </template>
  
  <script>
  import TeachingComponent from "./components/TeachingComponent.vue";
  import ConferencesComponent from "./components/ConferencesComponent.vue";
  import TalksComponent from "./components/TalksComponent.vue";
  import PublicationsComponent from "./components/PublicationsComponent.vue";
  
  import courses from 'teaching/courses.json';
  import conferences from 'conferences/conferences.json';
  import talks from 'talks/talks.json';
  import publications from "publications/publications.json";
  
  export default {
    components: {
      TeachingComponent,
      ConferencesComponent,
      TalksComponent,
      PublicationsComponent
    },
    data() {
      return {
        isCoursesEmpty: true,
        isConferencesEmpty: true,
        isTalksEmpty: true,
        isPublicationsEmpty: true
      };
    },
    created() {
      this.checkInfos();
    },
    methods: {
      checkInfos() {
        // Check if each JSON file is empty
        this.isCoursesEmpty = !courses || Object.keys(courses).length === 0;
        this.isConferencesEmpty = !conferences || Object.keys(conferences).length === 0;
        this.isTalksEmpty = !talks || Object.keys(talks).length === 0;
        this.isPublicationsEmpty = !publications || Object.keys(publications).length === 0;
      }
    }
  }
  </script>
