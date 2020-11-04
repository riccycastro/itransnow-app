<template>
  <div>
      <side-bar v-if="sideBarData" :side-bar-data="sideBarData"></side-bar>
    <!-- https://vuetifyjs.com/en/components/snackbars/#variants -->
    <notification></notification>

    <div
      class="tw-w-full lg:tw-w-content tw-relative tw-float-right tw-bg-light tw-transition-all tw-duration-300 tw-ease-in-out tw-min-h-screen">
      <template v-if="application">
        <tool-bar></tool-bar>
        <main-content></main-content>
      </template>
      <loading :showLoading="!application"></loading>
      <content-footer></content-footer>
    </div>
  </div>
</template>

<script>
  import ContentFooter from './ContentFooter.vue';
  import MainContent from './Content.vue';
  import SideBar from '@/components/side-bar/side-bar.vue';
  import ToolBar from '@/components/tool-bar/tool-bar.vue';
  // todo@rcastro - use this instead https://vuetifyjs.com/en/components/snackbars/#variants
  import Notification from '@/components/notification/notification';
  import Loading from '@/components/loading/loading';
  import {validationRuleMixin} from "@/mixins/validationRulesMixin";
  import {mapActions, mapGetters} from "vuex";

  export default {
    components: {
      Notification,
      MainContent,
      ContentFooter,
      SideBar,
      ToolBar,
      Loading,
    },
    mixins: [
      validationRuleMixin,
    ],
    data() {
      return {
        sidebarBackground: "green",
        sideBarData: null,
      };
    },
    async mounted() {
      await this.getApplication({
        applicationAlias: this.$route.params.applicationAlias,
        includes: []
      });

      this.sideBarData = {
        head: {
          logo: require('@/assets/img/logo.png'),
          name: 'iTranslateNow',
          url: '/'
        },
        body: {
          backgroundImage: require("@/assets/img/sidebar-2.jpg"),
          items: [
            {
              alias: 'sections',
              icon: 'view_module',
              text: 'Sections',
              path: `/application/${this.application.alias}/sections`
            },
            {
              alias: 'translations',
              icon: 'translate',
              text: 'Translations',
              path: `/application/${this.application.alias}/translations`,
            },
            {
              alias: 'users',
              icon: 'people',
              text: 'Users',
              path: `/application/${this.application.alias}/users`,
            },
            {
              alias: 'white-labels',
              icon: 'dvr',
              text: 'White labels',
              path: `/application/${this.application.alias}/white-labels`,
            }
          ]
        }
      }

      if (this.error) {
        if (this.error?.response?.status === 404) {
          // todo@rcastro - redirect to 404 page
        }
      }
    },
    computed: {
      ...mapGetters({
        application: 'application/application',
        error: 'application/error',
      }),
    },
    methods: {
      ...mapActions({
        getApplication: 'application/getApplication'
      }),
    }
  };

</script>
