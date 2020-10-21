<template>
  <v-dialog v-model="showEditForm" persistent max-width="600px">
    <v-card>
      <ValidationObserver v-slot="{ invalid }" ref="editForm">
        <form @submit.prevent="onEdit()">
          <loading :showLoading="showLoading"></loading>
          <v-card-title>
            <span class="headline">{{ section.name }}</span>
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
                      v-model="section.name"></v-text-field>
                  </validation-provider>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field label="Alias" v-model="aliasShadow" disabled
                                hint="Only alphanumeric and '_' value"></v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-checkbox class="mt-0"
                              v-model="section.isActive"
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
  import Loading from "../loading/loading";
  import {mapActions} from "vuex";

  export default {
    name: "section-edit-form.vue",
    components: {
      Loading,
      ValidationProvider,
      ValidationObserver,
    },
    props: {
      showEditForm: Boolean,
      showLoading: Boolean,
      section: Object,
    },
    data() {
      return {
        //we don't want to allow user to change section alias
        aliasShadow: this.section.alias,
        sectionBackup: JSON.stringify(this.section),
      }
    },
    computed: {
      changed() {
        return this.sectionBackup !== JSON.stringify(this.section);
      }
    },
    methods: {
      ...mapActions({
        updateSection: 'section/updateSection',
        setNotification: 'base/setNotification',
      }),
      onCloseEdit() {
        this.$emit('updateSection', JSON.parse(this.sectionBackup));
        this.$emit('triggerShowEditForm');
      },
      onEdit() {
        this.$refs.editForm.validate().then(async (success) => {
          if (!success) {
            return;
          }

          this.showLoading || this.$emit('triggerShowLoading')
          const updatedSection = await this.updateSection({
            section: this.section,
            sectionAlias: this.aliasShadow
          });

          if (this.hasError) {
            this.onCloseEdit();
          } else {
            this.setNotification({
              type: 'success',
              message: 'Updated with success!'
            });
            this.$emit('triggerShowEditForm');
            this.$emit('updateSection', updatedSection);
          }

          this.$emit('triggerShowLoading');
        });
      }
    },
  }
</script>
