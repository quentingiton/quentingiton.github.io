import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import PublicationsView from "@/views/PublicationsView.vue";
import TeachingView from "@/views/TeachingView.vue";
import TalksView from "@/views/TalksView.vue";
import NotesView from "@/views/NotesView.vue";
import BlogView from "@/views/BlogView.vue";
import BlogPostView from "@/views/BlogPostView.vue";

// Loaded on demand: these pull in Plotly, which is ~4.6 MB on its own. Kept as
// static imports it lands in the main bundle, so every visitor downloads a
// plotting library to read the home page.
const ScriptsView = () => import("@/views/ScriptsView.vue");
const LinearRegressionView = () => import("@/views/LinearRegressionView.vue");
const OneDLaguerreCellsView = () => import("@/views/OneDLaguerreCellsView.vue");

const routes = [
  { path: "/", component: HomeView },
  { path: "/publications", component: PublicationsView },
  { path: "/teaching", component: TeachingView },
  { path: "/talks", component: TalksView },
  { path: "/notes", component: NotesView },
  { path: "/blog", component: BlogView },
  { path: "/blog/:slug", component: BlogPostView },
  { path: "/scripts", component: ScriptsView },

  { path: "/scripts/linear-regression", component: LinearRegressionView },
  { path: "/scripts/1d-laguerre-cells", component: OneDLaguerreCellsView },
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
