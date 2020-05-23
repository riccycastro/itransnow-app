<template>
    <div>
        <div class="itn-sidebar-wrapper
    tw-bg-center tw-bg-top tw-bg-no-repeat tw-bg-cover
    tw-h-screen tw-z-50 tw-w-59
    tw-shadow-lg-r
    tw-text-white
    tw-fixed lg:tw-block tw-right-0 lg:tw-left-0
    tw-transition-all tw-duration-1000 tw-ease-in-out"
             :class="{'hidden': showSideBar}"
             :style="{backgroundImage: `url('${backgroundImage}')` }">
            <div class="tw-w-full tw-h-screen tw-bg-gray-900 tw-bg-opacity-75 tw-py-2 tw-px-3">
                <!-- SIDEBAR HEAD -->
                <div class="itn-sidebar-head tw-flex tw-border-b tw-border-gray-700 tw-pl-2 tw-cursor-pointer">
                    <div class="tw-bg-white tw-h-8 tw-w-8 tw-rounded-full tw-my-2 ">
                        <img class="tw-rounded-full" :src="logo">
                    </div>
                    <div class="tw-h-10 tw-ml-3 tw-mt-3">
                        <h1 class="tw-text-base">{{ name }}</h1>
                    </div>
                </div>
                <!-- SIDEBAR BODY -->
                <div class="tw-overflow-auto">
                    <div class="itn-sidebar-body tw-mt-3 tw-pt-3">
                        <!-- SIDEBAR ITEMS -->
                        <ul>
                            <side-bar-menu-item v-for="item of sideBarData.body.items"
                                                v-bind:menu-item="item" :key="item.alias"></side-bar-menu-item>
                        </ul>
                    </div>
                </div>
                <!-- SIDEBAR FOOTER -->
                <div class="itn-sidebar-footer tw-mb-0 tw-pt-3 tw-pl-2">

                </div>
                <!--      <div class="py-2">body</div>-->
            </div>
        </div>
        <div class="tw-absolute tw-w-full tw-h-full tw-z-40 tw-bg-gray-700 tw-bg-opacity-25 lg:tw-hidden"
        :class="{'hidden': showSideBar}"
        @click="setShowSideBar()"></div>
    </div>
</template>

<script>

  import SideBarMenuItem from './side-bar-menu-item.vue';
  import {mapActions, mapGetters} from "vuex";

  export default {
    name: "side-bar",
    components: {
      SideBarMenuItem,
    },
    props: {
      sideBarData: Object,
    },
    data() {
      return {
        name: this.sideBarData.head.name.toUpperCase(),
        items: this.sideBarData.body.items,
        backgroundImage: this.sideBarData.body.backgroundImage,
        logo: this.sideBarData.head.logo,
      }
    },
    mounted() {
      if (!this.sideBarData?.body?.items) {
        this.sideBarData.body = {
          items: []
        };
      }
    },
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

<style scoped>
    .overflow-auto {
        height: calc(100vh - 75px);
    }
</style>
