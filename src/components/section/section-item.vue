<template>
    <div>
        <v-card
                :rounded="'xl'"
                :elevation="3">
            <inactive-component-layer v-if="!section.isActive"></inactive-component-layer>
            <loading :showLoading="showLoading"></loading>

            <v-card-title class="tw-select-none">
                {{ section.name }}
            </v-card-title>
            <v-card-subtitle class="tw-select-none">
                {{getLastUpdatedAtMixin_getLastUpdate(section.updatedAt, section.createdAt)}}
            </v-card-subtitle>
            <v-card-actions class="tw-z-20">
                <v-spacer></v-spacer>
                <v-btn icon color="primary">
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
                :title="`Delete ${section.name} section?`"
                :subtitle="`You wont be able to recover this section.`"
                @onConfirm="onDelete"
                @onCancel="onCancelDelete"
        ></delete-dialog>
    </div>
</template>

<script>

  import {mapActions} from 'vuex';
  import InactiveComponentLayer from '@/components/inactive-component-layer';
  import Loading from '@/components/loading/loading.vue';
  import {getLastUpdatedAtMixin} from '@/mixins/get-last-updated-at.mixin';
  import DeleteDialog from '@/components/delete-dialog/delete-dialog';

  export default {
    name: "section-item",
    components: {
      InactiveComponentLayer,
      Loading,
      DeleteDialog,
    },
    props: {
      sectionData: {
        type: Object
      },
    },
    mixins: [
      getLastUpdatedAtMixin,
    ],
    data() {
      return {
        section: JSON.parse(JSON.stringify(this.sectionData)),
        showDeleteDialog: false,
        showLoading: false,
        showEditForm: false,
      }
    },
    methods: {
      ...mapActions({
        deleteSection: 'section/deleteSection'
      }),
      onCancelDelete() {
        this.showDeleteDialog = false;
      },
      async onDelete() {
        this.showDeleteDialog = false;
        this.showLoading = true;
        await this.deleteSection(this.section.alias);
        this.showLoading = false;
      },
    },
  }
</script>
