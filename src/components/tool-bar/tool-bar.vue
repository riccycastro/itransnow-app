<template>
    <div class="top-0 z-0 w-full h-17 py-3 px-4">
        <v-toolbar flat class="bg-light">
            <v-app-bar-nav-icon class="lg:tw-hidden" @click="setShowSideBar()" v-if="$route.name !== 'home-page'"></v-app-bar-nav-icon>
            <v-toolbar-title class="tw-capitalize">
                <img class="tw-w-10" :src="require('@/assets/img/logo.png')" v-if="$route.name === 'home-page'"/>
                <span v-else>{{ application.name }}</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-menu>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                            icon
                            v-bind="attrs"
                            v-on="on">
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item @click="doLogout">
                        <v-list-item-title>Logout</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-toolbar>
    </div>
</template>

<script>
  import {mapActions, mapGetters} from "vuex";

  export default {
    name: "tool-bar",
    computed: {
      ...mapGetters({
        showSideBar: 'base/showSideBar',
        application: 'application/application',
      }),
    },
    methods: {
      ...mapActions({
        storeSetShowSideBar: 'base/setShowSideBar'
      }),
      async doLogout() {
        await this.$router.push({path: 'logout'});
      },
      setShowSideBar() {
        this.storeSetShowSideBar(!this.showSideBar)
      }
    },
  }
</script>
