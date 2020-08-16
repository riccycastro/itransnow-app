<template>
    <div>
        <v-card
                :rounded="'xl'"
                :elevation="3"
                class="tw-cursor-pointer"
                v-on:dblclick="enterApp" @touchmove="setActive()">
            <inactive-component-layer v-if="!application.isActive"></inactive-component-layer>
            <!-- CARD LOADER-->
            <loading :showLoading="showLoading"></loading>
            <v-card-title class="tw-select-none">
                {{ application.name }}
            </v-card-title>
            <v-card-subtitle class="tw-select-none">
                {{ getLastUpdatedAtMixin_getLastUpdate(application.updatedAt, application.createdAt) }}
            </v-card-subtitle>
            <v-card-actions class="tw-z-20">
                <v-spacer></v-spacer>
                <v-btn icon color="primary" @click="showEditForm = true">
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon color="dark" @click="showDeleteDialog = true">
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
  import {getLastUpdatedAtMixin} from '@/mixins/get-last-updated-at.mixin';
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
      getLastUpdatedAtMixin,
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
        setApplication: 'application/setApplication',
      }),
      async enterApp() {
        this.setApplication(this.application);
        await this.$router.push({name: 'sections', params: {applicationAlias: this.application.alias}});
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
