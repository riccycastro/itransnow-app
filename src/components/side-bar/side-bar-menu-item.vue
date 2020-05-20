<template>
    <li
            :class="[`pl-4 py-2 rounded-sm flex mb-3 cursor-${cursor}`, {'bg-success': isActive, 'hover:bg-gray-400 hover:bg-opacity-25': !isActive}]"
            @click="goTo()">
        <div class="flex content-center mr-4">
            <i class="material-icons">{{icon}}</i>
        </div>
        <div class="flex content-center">
            <p class="font-light text-sm">{{text}}</p>
        </div>
    </li>
</template>

<script>
  import {mapGetters} from "vuex";

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
      async goTo() {
        await this.$router.push({path: this.path})
      }
    },
  }
</script>

