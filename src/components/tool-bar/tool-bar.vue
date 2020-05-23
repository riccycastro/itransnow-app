<template>
    <div class="top-0 z-0 w-full h-17 py-3 px-4">
        <v-toolbar flat class="bg-light">
            <v-app-bar-nav-icon class="lg:hidden" @click="setShowSideBar()"></v-app-bar-nav-icon>
            <v-toolbar-title>{{ $route.name | capitalize }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
        </v-toolbar>
    </div>
</template>

<script>
  import {mapGetters, mapActions} from "vuex";

  export default {
    name: "tool-bar",
    computed: {
      ...mapGetters({
        showSideBar: 'base/showSideBar'
      }),
    },
    methods: {
      ...mapActions({
        storeSetShowSideBar: 'base/setShowSideBar'
      }),
      setShowSideBar() {
        this.storeSetShowSideBar(!this.showSideBar)
      }
    },
  }
</script>
