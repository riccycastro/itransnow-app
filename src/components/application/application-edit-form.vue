<template>
    <v-dialog v-model="showEditForm" persistent max-width="600px">
        <v-card>
            <ValidationObserver v-slot="{ invalid }" ref="editForm">
                <form @submit.prevent="onEdit()">
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
                                        <v-text-field
                                                label="Name"
                                                required
                                                :rules="errors"
                                                :error="!!errors.length"
                                                v-model="application.name"></v-text-field>
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
                        <v-btn color="primary" text :disabled="!(changed && !invalid)" type="submit">
                            Save
                        </v-btn>
                    </v-card-actions>
                </form>
            </ValidationObserver>
        </v-card>
    </v-dialog>
</template>

<script>
  import {ValidationObserver, ValidationProvider} from "vee-validate";
  import {mapActions, mapGetters} from "vuex";
  import Loading from "../loading/loading";

  export default {
    name: "application-edit-form",
    components: {
      Loading,
      ValidationProvider,
      ValidationObserver,
    },
    props: {
      showEditForm: Boolean,
      showLoading: Boolean,
      application: Object,
    },
    data() {
      return {
        //we don't want to allow user to change application alias
        aliasShadow: this.application.alias,
        applicationBackup: JSON.stringify(this.application),
      }
    },
    computed: {
      ...mapGetters({
        hasError: 'application/hasError',
        error: 'application/error'
      }),
      changed: function () {
        return this.applicationBackup !== JSON.stringify(this.application);
      }
    },
    methods: {
      ...mapActions({
        updateApplication: 'application/updateApplication',
        setNotification: 'base/setNotification',
      }),
      onCloseEdit() {
        this.$emit('updateApplication', JSON.parse(this.applicationBackup));
        this.$emit('triggerShowEditForm');
      },
      async onEdit() {
        this.$refs.editForm.validate().then(async (success) => {
          if (!success) {
            return;
          }

          this.showLoading || this.$emit('triggerShowLoading')
          const updatedApplication = await this.updateApplication(this.application);

          if (this.hasError) {
            this.onCloseEdit();
          } else {
            this.setNotification({
              type: 'success',
              message: 'Updated with success!'
            });
            this.$emit('triggerShowEditForm');
            this.$emit('updateApplication', updatedApplication);
          }

          this.$emit('triggerShowLoading');
        })
      },
    },
  }
</script>
