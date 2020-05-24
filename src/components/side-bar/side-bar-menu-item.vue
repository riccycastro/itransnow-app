<template>
    <li
            :class="[`tw-pl-4 tw-py-2 tw-rounded-sm tw-flex tw-mb-3 tw-cursor-${cursor}`, {'tw-bg-success': isActive, 'hover:tw-bg-gray-400 hover:tw-bg-opacity-25': !isActive}]"
            @click="goTo()">
        <div class="tw-mt-1 tw-mr-4">
            <i class="material-icons">{{icon}}</i>
        </div>
        <div class="tw-flex tw-content-center tw-flex-wrap">
            <p class="tw-font-light tw-text-sm tw-mb-0 mb-0">{{text}}</p>
        </div>
    </li>
</template>

<script>
  import {mapActions, mapGetters} from "vuex";

  export default {
    name: "side-bar-menu-item",
    props: {
      menuItem: Object
    },
    data() {
      return {
        icon: this.menuItem.icon || 'category',
        text: this.menuItem.text || 'item',
        path: this.menuItem.path || '',
        cursor: this.menuItem.cursor ? this.menuItem.cursor : 'pointer'
      }
    },
    computed: {
      ...mapGetters({
        currentPath: 'base/currentPath'
      }),
      isActive() {
        return this.currentPath === this.menuItem.path;
      }
    },
    methods: {
      ...mapActions({
        storeSetShowSideBar: 'base/setShowSideBar'
      }),
      async goTo() {
        this.storeSetShowSideBar(false);
        await this.$router.push({path: this.path});
      }
    },
  }
</script>

