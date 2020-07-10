<template>
    <div class="tw-bg-light tw-h-screen">
        <tool-bar></tool-bar>

        <div class="tw-container tw-mx-auto tw-px-4">
            <div class="tw-ml-10">
                <span
                        class="tw-text-2xl tw-mr-6 tw-cursor-pointer tw-inline-block tw-w-32"
                        :class="{'tw-text-primary tw-font-normal': selectedTab === applicationsTabName}"
                        @click="selectTabApplications">Applications</span>
                <span
                        class="tw-text-2xl tw-cursor-pointer"
                        :class="{'tw-text-primary tw-font-normal': selectedTab === usersTabName}"
                        @click="selectTabUsers">Users</span>
            </div>
            <div class="tw-mt-12">
                <application-view v-show="selectedTab === applicationsTabName"></application-view>
                <user-view v-show="selectedTab === usersTabName"></user-view>
            </div>
        </div>

        <content-footer></content-footer>
    </div>
</template>

<script>
  import ContentFooter from '@/layouts/main/ContentFooter.vue';
  import ToolBar from '@/components/tool-bar/tool-bar.vue';
  import ApplicationView from '@/views/applications/applications.vue';
  import UserView from '@/views/users/users.vue';

  export default {
    name: "home-page",
    components: {
      ToolBar,
      ApplicationView,
      UserView,
      ContentFooter,
    },
    data() {
      return {
        applicationsTabName: 'applications',
        usersTabName: 'users',
        selectedTab: 'applications'
      }
    },
    methods: {
      async redirect() {
        await this.$router.push({path: 'application'});
      },
      selectTabApplications() {
        this.selectedTab = this.applicationsTabName
      },
      selectTabUsers() {
        this.selectedTab = this.usersTabName;
      }
    },
  }
</script>
