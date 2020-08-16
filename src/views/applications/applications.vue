<template>
    <div class="tw-content">
        <loading :showLoading="showLoading"></loading>
        <empty-state
                icon="important_devices"
                title="Create your first application"
                description="Create your first project so you can add your translations"
                v-if="loaded && !applications.length">
            <v-btn color="primary" @click="showForm = true">Create your first application</v-btn>
        </empty-state>
        <div class="tw-md-layout tw-grid lg:tw-grid-cols-3 md:tw-grid-cols-2 tw-gap-4 tw-grid-cols-1">
            <application-item
                    v-for="application in applications"
                    v-bind:applicationData="application"
                    :key="application.alias"></application-item>
        </div>
        <v-btn class="tw-fixed tw-bottom-24 tw-right-3" color="primary" fab dark @click="showForm = true">
            <v-icon>mdi-plus</v-icon>
        </v-btn>
        <application-create-form
                :showCreateForm="showForm"
                :showLoading="false"
                @triggerShowCreateForm="triggerShowCreateForm"
                @triggerShowLoading="triggerShowLoading"
        ></application-create-form>
    </div>
</template>

<script>

  import {mapActions, mapGetters} from 'vuex';
  import Loading from '@/components/loading/loading.vue';
  import ApplicationCreateForm from '@/components/application/application-create-form.vue';
  import ApplicationItem from '@/components/application/application-item';
  import EmptyState from '@/components/empty-state/empty-state';

  export default {
    name: "applications",
    components: {
      EmptyState,
      ApplicationItem,
      Loading,
      ApplicationCreateForm
    },
    data() {
      return {
        showLoading: false,
        showForm: false
      }
    },
    async created() {
      this.showLoading = true;
      await this.getApplications();
      this.showLoading = false;
    },
    computed: {
      ...mapGetters({
        applications: 'application/applications',
        error: 'application/error',
        loaded: 'application/loaded'
      })
    },
    methods: {
      ...mapActions({
        getApplications: 'application/getApplications',
        setNotification: 'base/setNotification',
      }),
      triggerShowCreateForm() {
        this.showForm = !this.showForm;
      },
      triggerShowLoading() {
        this.showLoading = !this.showLoading
      },
    },
  }
</script>
