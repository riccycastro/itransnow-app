<template>
  <div>
    <side-bar :side-bar-data="sideBarData"></side-bar>
    <notification></notification>

    <div class="tw-w-full lg:tw-w-content tw-relative tw-float-right tw-bg-light tw-transition-all tw-duration-300 tw-ease-in-out tw-h-screen">
      <tool-bar></tool-bar>
      <main-content></main-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>

<script>
  import ContentFooter from './ContentFooter.vue';
  import MainContent from './Content.vue';
  import SideBar from '@/components/side-bar/side-bar.vue';
  import ToolBar from '@/components/tool-bar/tool-bar.vue';
  import Notification from '@/components/notification/notification';

  export default {
    components: {
      Notification,
      MainContent,
      ContentFooter,
      SideBar,
      ToolBar
    },
    data() {
      return {
        sidebarBackground: "green",
        sideBarData: {
          head: {
            logo: require('@/assets/img/logo.png'),
            name: 'iTranslateNow'
          },
          body: {
            backgroundImage: require("@/assets/img/sidebar-2.jpg"),
            items: [
              {
                alias: 'apps',
                icon: 'apps',
                text: 'Applications',
                path: '/applications',
              },
              {
                alias: 'users',
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
