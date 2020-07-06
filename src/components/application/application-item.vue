<template>
    <div>
        <v-card>
            <inactive-component-layer v-if="!application.isActive"></inactive-component-layer>
            <!-- CARD LOADER-->
            <loading :showLoading="showLoading"></loading>
            <v-card-title>
                {{ application.name }}
            </v-card-title>
            <v-card-subtitle>
                {{getLastUpdate()}}
            </v-card-subtitle>
            <v-card-actions class="tw-z-20">
                <v-spacer></v-spacer>
                <v-btn icon color="primary">
                    <v-icon>mdi-translate</v-icon>
                </v-btn>
                <v-btn icon color="primary" @click="showEditForm = true">
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon color="danger" @click="showDeleteDialog = true">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>

        <!-- DELETE CONFIRM DIALOG-->
        <delete-dialog
                :showDialog="showDeleteDialog"
                :title="`Delete ${application.name} app?`"
                :subtitle="`You wont be able to recover this application.`"
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
  import Loading from '@/components/loading/loading.vue';
  import {validationRuleMixin} from '@/mixins/validationRulesMixin';
  import ApplicationEditForm from './application-edit-form';
  import DeleteDialog from '@/components/delete-dialog/delete-dialog';
  import InactiveComponentLayer from '@/components/inactive-component-layer';

  export default {
    name: "application-item",
    components: {
      InactiveComponentLayer,
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
      validationRuleMixin,
    ],
    data() {
      return {
        application: JSON.parse(JSON.stringify(this.applicationData)),
        showDeleteDialog: false,
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
        this.showDeleteDialog = false
      },
      async onDelete() {
        this.showDeleteDialog = false;
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
