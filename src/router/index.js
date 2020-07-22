import Vue from "vue";
import VueRouter from "vue-router";
import store from '../store'

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  linkExactActiveClass: "nav-item active",
  routes: [

    {
      // =============================================================================
      // FULL PAGE LAYOUT ROUTES
      // =============================================================================
      path: "",
      component: () => import("@/layouts/full-page/full-page.vue"),
      name: 'fullPage',
      children: [
        {
          path: "/",
          name: "home-page",
          component: () => import('@/views/home-page/home-page.vue'),
          meta: {
            authRequired: true
          }
        },
        {
          path: "/login",
          name: "page-login",
          component: () => import("@/views/login/login.vue"),
          meta: {
            authRequired: false
          }
        },
      ]
    },
    {
      // =============================================================================
      // MAIN LAYOUT ROUTES
      // =============================================================================
      path: "",
      meta: {
        requiresAuth: true,
      },
      component: () => import("@/layouts/main/Main.vue"),
      children: [
        {
          path: '/application/:applicationAlias/sections',
          name: 'sections',
          component: () => import('@/views/sections/sections.vue'),
          meta: {
            authRequired: true
          }
        },
        {
          path: '/logout',
          name: 'page-logout',
          meta: {
            authRequired: true
          }
        }
      ],
    },
  ]
});

router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.authRequired)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (to.matched.some(record => record.name === 'page-logout')) {
      store.commit('security/AUTHENTICATION_RESET');
      next('/login')
    } else if (store.getters['security/isAuthenticated']) {
      store.commit('base/UPDATE_CURRENT_PATH', to.name)
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else if (to.matched.some(record => record.name === 'page-login') && store.getters['security/isAuthenticated']) {
    next({name: 'applications'})
  } else {
    next();
  }
});

export default router;
