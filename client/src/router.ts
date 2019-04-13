import Vue from "vue";
import Router from "vue-router";
import store from './store'
import Home from "./views/Home.vue";

Vue.use(Router);

let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () =>
        import(/* webpackChunkName: "login" */ "./views/Login.vue"),
      meta: {
        guest: true
      }
    },
    {
      path: "/register",
      name: "Register",
      component: () =>
        import(/* webpackChunkName: "Register" */ "./views/Register.vue"),
      meta: {
        guest: true
      }
    },
    {
      path: "/admin",
      name: "admin",
      component: () =>
        import(/* webpackChunkName: "admin" */ "./views/Admin.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () =>
        import(/* webpackChunkName: "dashboard" */ "./views/Dashboard.vue"),
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
          next({ name: 'dashboard'});
        } else {
          next({
              path: '/login',
              params: { nextUrl: to.fullPath }
          });
        }
    } else if(to.matched.some(record => record.meta.guest)) {
        if(store.getters.isLoggedIn){
          next({ name: 'dashboard'});
        }
        else{
          next();
        }
    }else {
        next();
    }
})

export default router;
