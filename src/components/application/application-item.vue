<template>
    <div data-app>
        <v-card>
            <!-- CARD LOADER-->
            <div class="tw-absolute
            tw-h-full tw-w-full tw-z-10
            tw-content-center tw-flex tw-flex-wrap tw-justify-center
            tw-bg-white tw-bg-opacity-50" :class="{'tw-hidden': !showLoading}">
                <v-progress-circular
                        :width="2"
                        color="red"
                        :size="70"
                        indeterminate
                ></v-progress-circular>
            </div>

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
                <v-card-title>
                    <span class="headline">{{ application.name }}</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field label="Name" required v-model="application.name"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field label="Alias" v-model="application.alias"
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
                    <v-btn color="primary" text @click="showEditForm = false">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
  import {mapActions, mapGetters} from "vuex";
  import {loaderMixin} from "@/mixins/loaderMixin";

  export default {
    name: "application-item",
    props: {
      applicationData: {
        type: Object
      },
    },
    mixins: [
      loaderMixin,
    ],
    data() {
      return {
        application: JSON.parse(JSON.stringify(this.applicationData)),
        applicationBackup: this.applicationData,
        loaderContainer: this.$refs.loadingContainer,
        showDialog: false,
        showLoading: false,
        showEditForm: false,
      }
    },
    computed: {
      ...mapGetters({
        hasError: 'application/hasError',
        error: 'application/error'
      })
    },
    methods: {
      ...mapActions({
        deleteApplication: 'application/deleteApplication'
      }),
      getLastUpdate() {
        if (this.application.updatedAt) {
          return `updated at ${this.$options.filters.date(this.application.updatedAt)}`;
        }

        return `created at ${this.$options.filters.date(this.application.createdAt)}`;
      },
      onCloseEdit() {
        this.application = JSON.parse(JSON.stringify(this.applicationBackup));
        this.showEditForm = false;
      },
      async onDelete() {
        this.showDialog = false;
        this.showLoading = true;
        await this.deleteApplication(this.application.alias);
        this.showLoading = false;
      },
      onEdit() {
        console.log("called")
        this.$_loaderMixin_loaderStart(document.getElementsByClassName('container'))
      },
      doShowEditForm() {
        this.showEditForm = true;
      }
    },
  }
</script>
