<template>
    <v-dialog v-model="showCreateForm" persistent max-width="600px">
        <v-card>
            <ValidationObserver v-slot="{ invalid }" ref="form">
                <loading :showLoading="showLoading"></loading>
                <v-card-title>
                    <span class="headline">{{ application.name }}</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" md="12">
                                <validation-provider mode="aggressive" name="Name"
                                                     rules="min:6|required"
                                                     v-slot="{ errors }">
                                    <v-text-field
                                            label="Name"
                                            required
                                            v-model="application.name"
                                            :rules="errors"
                                            :error="!!errors.length"
                                    ></v-text-field>
                                </validation-provider>
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
                    <v-btn text @click="onCloseCreate()">Close</v-btn>
                    <v-btn color="primary" text @click="onCreate()" :disabled="!(!invalid)">
                        Save
                    </v-btn>
                </v-card-actions>
            </ValidationObserver>
        </v-card>
    </v-dialog>
</template>

<script>
  import {ValidationObserver, ValidationProvider} from "vee-validate";
  import {mapActions, mapGetters} from "vuex";
  import Loading from "../loading/loading";

  export default {
    name: "application-create-form",
    components: {
      Loading,
      ValidationProvider,
      ValidationObserver,
    },
    props: {
      showCreateForm: Boolean,
      showLoading: Boolean,
    },
    data() {
      return {
        application: {},
      }
    },
    computed: {
      ...mapGetters({
        hasError: 'application/hasError',
        error: 'application/error'
      }),
    },
    methods: {
      ...mapActions({
        createApplication: 'application/createApplication',
        setNotification: 'base/setNotification',
      }),
      onCloseCreate() {
        this.$emit('triggerShowCreateForm');
      },
      async onCreate() {
        this.showLoading || this.$emit('triggerShowLoading')
        this.application.alias = this.application.name
        await this.createApplication(this.application);

        if (this.hasError) {
          this.onCloseCreate();
        } else {
          this.setNotification({
            type: 'success',
            message: `Application created with success.`
          })
          this.$emit('triggerShowCreateForm');
        }

        this.$emit('triggerShowLoading')
      },
    },
  }
</script>
