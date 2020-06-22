import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/cookies",
    name: "CookiesSample",
    component: () =>
      import("../components/CookiesSample.vue")
  },
  {
    path: "/store",
    name: "StoreSample",
    component: () =>
      import("../components/StoreSample.vue")
  },
  {
    path: "/excel",
    name: "ExcelTableSample",
    component: () =>
      import("../components/ExcelTableSample.vue")
  },
  {
    path: "/kuayu",
    name: "CorsFilterSample",
    component: () =>
      import("../components/CorsFilterSample.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
