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
                <v-btn icon color="primary" @click="doShowEditForm()">
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon color="danger" @click="showDialog = true">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>

        <!-- DELETE CONFIRM DIALOG-->
        <v-dialog v-model="showDialog" max-width="400">
            <v-card>
                <v-card-title class="headline tw-break-normal">Delete {{application.name}} app?
                </v-card-title>
                <v-card-text>
                    You wont be able to recover this application.
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="showDialog = false">
                        Cancel
                    </v-btn>
                    <v-btn text color="danger" @click="onDelete()">
                        Delete
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- EDIT DIALOG -->
        <v-dialog v-model="showEditForm" persistent max-width="600px">
            <v-card>
                <ValidationObserver v-slot="{ invalid }" ref="form">
                    <loading :showLoading="showLoading"></loading>
                    <v-card-title>
                        <span class="headline">{{ application.name }}</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="6">
                                    <validation-provider mode="aggressive" name="Name"
                                                         rules="min:6|required"
                                                         v-slot="{ errors }">
                                        <v-text-field label="Name" required v-model="application.name"></v-text-field>
                                        <span class="tw-text-danger tw-text-sm">{{ errors[0] }}</span>
                                    </validation-provider>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field label="Alias" v-model="aliasShadow" disabled
                                                  hint="Only alphanumeric and '_' value"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12">
                                    <v-checkbox class="mt-0"
                                                v-model="application.isActive"
                                                label="active"></v-checkbox>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text @click="onCloseEdit()">Close</v-btn>
                        <v-btn color="primary" text @click="onEdit()" :disabled="!(changed && !invalid)">
                            Save
                        </v-btn>
                    </v-card-actions>
                </ValidationObserver>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';
  import {loaderMixin} from '@/mixins/loaderMixin';
  import Loading from '@/components/loading/loading.vue';
  import {ValidationObserver, ValidationProvider} from 'vee-validate';
  import {validationRuleMixin} from '@/mixins/validationRulesMixin';

  export default {
    name: "application-item",
    components: {
      Loading,
      ValidationProvider,
      ValidationObserver,
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
        applicationBackup: JSON.stringify(this.applicationData),
        loaderContainer: this.$refs.loadingContainer,
        showDialog: false,
        showLoading: false,
        showEditForm: false,
        //we don't want to allow user to change application alias
        aliasShadow: this.applicationData.alias,
      }
    },
    computed: {
      ...mapGetters({
        hasError: 'application/hasError',
        error: 'application/error'
      }),
      changed: function () {
        console.log(this.applicationBackup !== JSON.stringify(this.application))
        return this.applicationBackup !== JSON.stringify(this.application);
      }
    },
    methods: {
      ...mapActions({
        deleteApplication: 'application/deleteApplication',
        updateApplication: 'application/updateApplication',
        setNotification: 'base/setNotification',
      }),
      getLastUpdate() {
        if (this.application.updatedAt) {
          return `updated at ${this.$options.filters.date(this.application.updatedAt)}`;
        }

        return `created at ${this.$options.filters.date(this.application.createdAt)}`;
      },
      onCloseEdit() {
        this.application = JSON.parse(this.applicationBackup);
        this.showEditForm = false;
      },
      async onDelete() {
        this.showDialog = false;
        this.showLoading = true;
        await this.deleteApplication(this.application.alias);
        this.showLoading = false;
      },
      async onEdit() {
        this.showLoading = true
        await this.updateApplication(this.application);

        if (this.hasError) {
          this.onCloseEdit();
        }

        this.showLoading = false
        this.showEditForm = false;
        this.setNotification({
          type: 'success',
          message: 'Updated with success!'
        });
      },
      doShowEditForm() {
        this.showEditForm = true;
      },
    },
  }
</script>
