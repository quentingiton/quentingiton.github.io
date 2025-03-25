import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import TeachingView from "@/views/TeachingView.vue";
import PublicationsView from "@/views/PublicationsView.vue";
import NotesView from "@/views/NotesView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/teaching", component: TeachingView },
  { path: "/publications", component: PublicationsView },
  { path: "/notes", component: NotesView },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    } else {
      return { top: 0 };
    }
  },
});

export default router;
