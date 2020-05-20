<template>
    <div class="md-layout-item md-medium-size-100 md-size-33">
        <md-card class="md-primary" md-theme="green-card shadow-md" ref="loadingContainer">
            <md-card-content>
                <div class="flex flex-wrap justify-between">
                    <div class="md-title">
                        {{application.name}}
                    </div>
                    <span class="text-gray-500">
                                {{getLastUpdate()}}
                            </span>
                </div>
                <div class="md-subhead">
                    lorem ipsum
                </div>
            </md-card-content>
            <md-card-actions>
                <md-icon>translate</md-icon>
                <md-button class="md-primary mr-3 min-w-20" @click="onEdit()">
                    <md-icon>edit</md-icon>
                </md-button>
                <md-button class="md-raised md-danger min-w-20" @click="showConfirmDelete()">
                    <md-icon>delete</md-icon>
                </md-button>
            </md-card-actions>
        </md-card>
        <md-dialog-confirm
                :md-active.sync="showDialog"
                :md-content="`Do you really want to delete <b>${application.name}</b>?`"
                md-confirm-text="Delete"
                @md-confirm="onDelete"/>
    </div>
</template>

<script>
  import {mapActions, mapGetters} from "vuex";
  import {loaderMixin} from "@/mixins/loaderMixin";

  export default {
    name: "application-item",
    props: {
      application: {
        type: Object
      },
    },
    mixins: [
      loaderMixin,
    ],
    data() {
      return {
        loaderContainer: this.$refs.loadingContainer,
        showDialog: false,
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
      async onDelete() {
        this.$_loaderMixin_loaderStart(this.loaderContainer)
        await this.deleteApplication(this.application.alias);
            this.$_loaderMixin_loaderStop()
          },
      onEdit() {
        console.log("called")
        this.$_loaderMixin_loaderStart(document.getElementsByClassName('container'))
      },
      onTranslation() {
        this.$_loaderMixin_loaderStop();
      },
      showConfirmDelete() {
        this.showDialog = true
      }
    },
  }
</script>
