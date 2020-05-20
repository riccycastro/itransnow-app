<template>
  <div class="wrapper" :class="{ 'nav-open': false }">
    <notifications></notifications>

    <side-bar :side-bar-data="sideBarData"></side-bar>

    <div class="w-full lg:w-content relative float-right bg-light transition-all duration-300 ease-in-out">
      <tool-bar></tool-bar>
      <main-content></main-content>

      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>

<script>
  import ContentFooter from "./ContentFooter.vue";
  import MainContent from "./Content.vue";
  import SideBar from "@/components/side-bar/side-bar.vue";
  import ToolBar from '@/components/tool-bar/tool-bar.vue';

  export default {
    components: {
      MainContent,
      ContentFooter,
      SideBar,
      ToolBar
    },
    data() {
      return {
        sidebarBackground: "green",
        sidebarBackgroundImage: require("@/assets/img/sidebar-2.jpg"),
        sideBarData: {
          head: {
            logo: require('@/assets/img/vue-logo.png'),
            name: 'iTranslateNow'
          },
          body: {
            items: [
              {
                icon: 'apps',
                text: 'Applications',
                path: '/applications',
              },
              {
                icon: 'person',
                text: 'Users',
                path: '/users',
              }
            ]
          }
        }
      };
    },
    methods: {}
  };

</script>
