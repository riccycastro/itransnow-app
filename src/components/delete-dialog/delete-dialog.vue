<template>
    <v-dialog
            v-model="showDialog"
            max-width="400"
            @click:outside="onCancel()"
            @keydown.esc="onCancel()">
        <v-card>
            <v-card-title class="headline tw-break-normal">
                {{title}}
            </v-card-title>
            <v-card-text>
                {{subtitle}}
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="onCancel()">
                    Cancel
                </v-btn>
                <v-btn text color="primary" @click="onConfirm()">
                    Delete
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
  export default {
    name: 'delete-dialog',
    props: {
      showDialog: {
        type: Boolean,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      subtitle: {
        type: String,
        required: false,
      },
    },
    data(){
      return {
        show: this.showDialog
      }
    },
    methods: {
      onCancel() {
        this.$emit('onCancel')
      },
      onConfirm() {
        this.$emit('onConfirm')
      },
    },
  }
</script>
