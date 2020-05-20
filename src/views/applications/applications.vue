<template>
    <div class="content">
        <div class="md-layout">
            <md-empty-state
                    v-if="loaded && !applications.length"
                    md-icon="devices_other"
                    md-label="Create your first application"
                    md-description="Creating project, you'll be able to manage the translations.">
                <md-button class="md-primary md-raised">Create first application</md-button>
            </md-empty-state>
            <application-item
                    v-for="application in applications"
                    v-bind:application="application"
                    :key="application.alias"></application-item>

<!--            <vs-button-->
<!--                    class="fixed bottom-24 right-3"-->
<!--                    radius-->
<!--                    color="warning"-->
<!--                    type="filled"-->
<!--                    icon="add"-->
<!--                    size="large"-->
<!--                    title="create a new application">-->
<!--            </vs-button>-->
        </div>
    </div>
</template>

<script>

  import {mapActions, mapGetters} from 'vuex';
  import ApplicationItem from '@/components/application/application-item.vue';

  export default {
    name: "applications",
    components: {
      ApplicationItem
    },
    data() {
      return {
        first: true
      }
    },
    async created() {
      await this.getApplications();
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
        getApplications: 'application/getApplications'
      }),
    },
  }
</script>
