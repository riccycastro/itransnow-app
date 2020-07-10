<template>
    <div>
        <v-card
        :elevation="5">
            <inactive-component-layer v-if="!user.isActive"></inactive-component-layer>
            <loading :showLoading="showLoading"></loading>
            <v-card-title class="tw-break-normal">
                {{ user.name }}
            </v-card-title>
            <v-card-subtitle>
                {{user.email}}
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
                :title="`Delete user ${user.name}?`"
                :subtitle="`You wont be able to recover this user.`"
                @onConfirm="onDelete"
                @onCancel="onCancelDelete"
        ></delete-dialog>
    </div>
</template>

<script>
  import InactiveComponentLayer from '@/components/inactive-component-layer';
  import Loading from '@/components/loading/loading';
  import DeleteDialog from "@/components/delete-dialog/delete-dialog";

  export default {
    name: 'user-item',
    components: {DeleteDialog, Loading, InactiveComponentLayer},
    props: {
      userData: Object
    },
    data() {
      return {
        user: JSON.parse(JSON.stringify(this.userData)),
        showDeleteDialog: false,
        showLoading: false,
      }
    },
    methods: {
      onCancelDelete() {
        this.showDeleteDialog = false
      },
      async onDelete() {
        this.showDeleteDialog = false;
      }
    },
  }
</script>
