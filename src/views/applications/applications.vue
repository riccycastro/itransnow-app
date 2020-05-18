<template>
    <div class="content">
        <div class="md-layout">
            <div class="md-layout-item md-medium-size-100 md-size-33" v-for="application in applications"
                 :key="application.alias">
                <md-card class="md-primary" md-theme="green-card">
                    <md-card-content>
                        <div class="flex flex-wrap justify-between">
                            <div class="md-title">
                                {{application.name}}
                            </div>
                            <span class="text-gray-500">
                                {{getLastUpdate(application)|date}}
                            </span>
                        </div>
                        <div class="md-subhead">
                            lorem ipsum
                        </div>
                    </md-card-content>
                    <md-card-actions>
                        <vs-button class="mr-3 w-20" color="primary" type="filled" icon="edit">Edit</vs-button>
                        <vs-button class="w-20" color="danger" type="filled" icon="delete">Delete</vs-button>
                    </md-card-actions>
                </md-card>
            </div>
            <vs-button class="fixed bottom-24 right-3" radius color="warning" type="filled" icon="add" size="large">
            </vs-button>
        </div>
    </div>
</template>

<script>

  import {mapActions, mapGetters} from 'vuex';

  export default {
    name: "applications",
    async created() {
      await this.getApplications();
    },
    computed: {
      ...mapGetters({
        applications: 'application/applications',
        error: 'application/error',
      })
    },
    methods: {
      ...mapActions({
        getApplications: 'application/getApplications'
      }),
      getLastUpdate(application) {
        if (application.updatedAt) {
          return application.updatedAt
        }

        return application.createdAt;
      }
    },
  }
</script>
