import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/Login.vue";
import Calc from "@/components/Calc/Calc.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login
    },
    {
      path: "/calc",
      name: "Calc",
      component: Calc
    }
  ]
});
