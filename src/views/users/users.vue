<template>
    <div class="tw-content">
        <loading :showLoading="showLoading"></loading>
        <div class="tw-md-layout tw-grid lg:tw-grid-cols-3 md:tw-grid-cols-2 tw-gap-4 tw-grid-cols-1">
            <user-item
                    v-for="user in users"
                    :key="user.username"
            ></user-item>
        </div>
        <v-btn class="tw-fixed tw-bottom-24 tw-right-3" color="primary" fab dark>
            <v-icon>mdi-plus</v-icon>
        </v-btn>
    </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';
  import Loading from '@/components/loading/loading.vue';
  import UserItem from "../../components/user/user-item";

  export default {
    name: "users",
    components: {UserItem, Loading},
    data() {
      return {
        showLoading: false,
      }
    },
    async created() {
      this.showLoading = true;
      await this.getUsers();
      this.showLoading = false;
    },
    computed: {
      ...mapGetters({
        users: 'user/users'
      }),
    },
    methods: {
      ...mapActions({
        getUsers: 'user/getUsers',
      }),
    },
  }
</script>

<style scoped>

</style>
