<template>
    <div data-app>
        <v-card>
            <!-- CARD LOADER-->
            <loading :showLoading="showLoading"></loading>

            <v-card-title>
                {{ application.name }}
            </v-card-title>
            <v-card-subtitle>
                {{getLastUpdate()}}
            </v-card-subtitle>
            <v-card-text>
                lorem ipsum
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon color="primary">
                    <v-icon>mdi-translate</v-icon>
                </v-btn>
                <v-btn icon color="primary" @click="showEditForm = true">
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon color="danger" @click="showDialog = true">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>

        <!-- DELETE CONFIRM DIALOG-->
        <delete-dialog
                :showDialog="showDialog"
                :subtitle="`You wont be able to recover this application.`"
                :title="`Delete ${application.name} app?`"
                @onConfirm="onDelete"
                @onCancel="onCancelDelete"
        ></delete-dialog>

        <!-- EDIT DIALOG -->
        <application-edit-form
                :application="application"
                :showEditForm="showEditForm"
                :showLoading="showLoading"
                @triggerShowEditForm="triggerShowEditForm"
                @triggerShowLoading="triggerShowLoading"
                @updateApplication="updateApplication"
        ></application-edit-form>
    </div>
</template>

<script>
  import {mapActions} from 'vuex';
  import {loaderMixin} from '@/mixins/loaderMixin';
  import Loading from '@/components/loading/loading.vue';
  import {validationRuleMixin} from '@/mixins/validationRulesMixin';
  import ApplicationEditForm from './application-edit-form';
  import DeleteDialog from '@/components/delete-dialog/delete-dialog';

  export default {
    name: "application-item",
    components: {
      DeleteDialog,
      ApplicationEditForm,
      Loading,
    },
    props: {
      applicationData: {
        type: Object
      },
    },
    mixins: [
      loaderMixin,
      validationRuleMixin,
    ],
    data() {
      return {
        application: JSON.parse(JSON.stringify(this.applicationData)),
        showDialog: false,
        showLoading: false,
        showEditForm: false,
      }
    },
    methods: {
      ...mapActions({
        deleteApplication: 'application/deleteApplication',
      }),
      getLastUpdate() {
        if (this.application.updatedAt) {
          return `updated at ${this.$options.filters.date(this.application.updatedAt)}`;
        }
        return `created at ${this.$options.filters.date(this.application.createdAt)}`;
      },
      onCancelDelete() {
        this.showDialog = false
      },
      async onDelete() {
        this.showDialog = false;
        this.showLoading = true;
        await this.deleteApplication(this.application.alias);
        this.showLoading = false;
      },
      triggerShowEditForm() {
        this.showEditForm = !this.showEditForm;
      },
      triggerShowLoading() {
        this.showLoading = !this.showLoading;
      },
      updateApplication(application) {
        this.application = application;
      },
    },
  }
</script>
