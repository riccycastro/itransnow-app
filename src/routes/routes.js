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
      // MAIN LAYOUT ROUTES
      // =============================================================================
      path: "",
      meta: {
        requiresAuth: true,
      },
      component: () => import("@/layouts/main/Main.vue"),
      children: [
        {
          path: '/applications',
          name: 'applications',
          component: () => import('@/views/applications/applications.vue'),
          meta: {
            authRequired: true
          }
        },
        {
          path: '/users',
          name: 'users',
          component: () => import('@/views/users/users.vue'),
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
    {
      // =============================================================================
      // FULL PAGE LAYOUT ROUTES
      // =============================================================================
      path: "",
      component: () => import("@/layouts/full-page/FullPage.vue"),
      name: 'fullPage',
      children: [
        {
          path: "/login",
          name: "page-login",
          component: () => import("@/views/login/login.vue"),
          meta: {
            authRequired: false
          }
        },
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (to.matched.some(record => record.name === 'page-logout')) {
      store.commit('security/AUTHENTICATION_RESET');
      next('/login')
    } else if (store.getters['security/isAuthenticated']) {
      store.commit('base/UPDATE_CURRENT_PATH', to.path)
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
