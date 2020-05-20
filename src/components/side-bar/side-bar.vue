<template>
    <div class="itn-sidebar-wrapper
    bg-center bg-top bg-no-repeat bg-cover
    h-screen z-50 w-59
    shadow-lg-r
    text-white
    hidden fixed lg:block right-0 lg:left-0
    transition-all duration-300 ease-in-out"
    style="background-image: url('sidebar-2.jpg')">
        <div class="w-full h-screen bg-gray-900 bg-opacity-75 py-2 px-3">
            <!-- SIDEBAR HEAD -->
            <div class="itn-sidebar-head flex border-b border-gray-700 pl-2 cursor-pointer">
                <div class="bg-white h-8 w-8 rounded-full my-2 ">
                    <img class="rounded-full" :src="sideBarData.head.logo">
                </div>
                <div class="h-10 ml-3 mt-3">
                    <h1 class="text-base">{{ sideBarData.head.name.toUpperCase() }}</h1>
                </div>
            </div>
            <!-- SIDEBAR BODY -->
            <div class="overflow-auto">
                <div class="itn-sidebar-body mt-3 pt-3">
                    <!-- SIDEBAR ITEMS -->
                    <ul >
                        <side-bar-menu-item v-for="item of sideBarData.body.items"
                                            v-bind:menu-item="item"></side-bar-menu-item>
                    </ul>
                </div>
            </div>
            <!-- SIDEBAR FOOTER -->
            <div class="itn-sidebar-footer mb-0 pt-3 pl-2">

            </div>
            <!--      <div class="py-2">body</div>-->
        </div>
    </div>
</template>

<script>

  import SideBarMenuItem from './side-bar-menu-item.vue';

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
        menu: [
          {
            icon: 'apps',
            text: 'Applications'
          }
        ]
      }
    },
    mounted() {
      if (!this.sideBarData?.body?.items) {
        this.sideBarData.body = {
          items: []
        };
      }
    }
  }
</script>

<style scoped>
    .overflow-auto {
        height: calc(100vh - 75px);
    }
</style>
