<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar
      :sidebar-item-color="sidebarBackground"
      :sidebar-background-image="sidebarBackgroundImage"
    >
      <mobile-menu slot="content"></mobile-menu>

      <sidebar-link to="/applications">
        <md-icon>apps</md-icon>
        <p>Applications</p>
      </sidebar-link>

      <sidebar-link to="/users">
        <md-icon>person</md-icon>
        <p>Users</p>
      </sidebar-link>

      <sidebar-link to="/sections">
        <md-icon>view_agenda</md-icon>
        <p>Sections</p>
      </sidebar-link>

      <sidebar-link to="/logout" class="absolute bottom-0">
        <md-icon>exit_to_app</md-icon>
        <p>Logout</p>
      </sidebar-link>
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <fixed-plugin
        :color.sync="sidebarBackground"
        :image.sync="sidebarBackgroundImage"
      >
      </fixed-plugin>

      <main-content></main-content>

      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>

<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import MainContent from "./Content.vue";
import MobileMenu from "@/layouts/main/MobileMenu.vue";
import FixedPlugin from "./extra/FixedPlugin.vue";

export default {
  components: {
    TopNavbar,
    MainContent,
    ContentFooter,
    MobileMenu,
    FixedPlugin
  },
  data() {
    return {
      sidebarBackground: "green",
      sidebarBackgroundImage: require("@/assets/img/sidebar-2.jpg")
    };
  },
  methods: {

  }
};
</script>
