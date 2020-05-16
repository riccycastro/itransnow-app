// import Dashboard from "@/pages/Dashboard.vue";
// import UserProfile from "@/pages/UserProfile.vue";
// import TableList from "@/pages/TableList.vue";
// import Typography from "@/pages/Typography.vue";
// import Icons from "@/pages/Icons.vue";
// import Maps from "@/pages/Maps.vue";
// import Notifications from "@/pages/Notifications.vue";
// import UpgradeToPRO from "@/pages/UpgradeToPRO.vue";


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
          path: '/',
          name: 'home',
          component: () => import('@/views/dashboard/dashboard.vue'),
          meta: {
            authRequired: true
          }
        },
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
  console.log(to.matched)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    console.log("if not, redirect to login page.")
    if (store.getters['security/isAuthenticated']) {
      console.log('authenticated')
      next()
    } else {
      console.log('not authenticated')
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else if (to.matched.some(record => record.name === 'page-login') && store.getters['security/isAuthenticated']) {
    next({
      path: '/',
      query: {redirect: to.fullPath}
    })
  } else {
    next();
  }
});

/*
const routes = [
  {
    path: "/",
    component: Main,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard
      },
      {
        path: "user",
        name: "User Profile",
        component: UserProfile
      },
      {
        path: "table",
        name: "Table List",
        component: TableList
      },
      {
        path: "typography",
        name: "Typography",
        component: Typography
      },
      {
        path: "icons",
        name: "Icons",
        component: Icons
      },
      {
        path: "maps",
        name: "Maps",
        meta: {
          hideFooter: true
        },
        component: Maps
      },
      {
        path: "notifications",
        name: "Notifications",
        component: Notifications
      },
      {
        path: "upgrade",
        name: "Upgrade to PRO",
        component: UpgradeToPRO
      }
    ]
  }
];*/

export default router;
