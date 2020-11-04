<template>
  <div class="tw-content">
    <loading :showLoading="showLoading"></loading>
    <empty-state
      v-if="loaded && !translations.length"
      icon="translate"
      title="Add your first translation">
      <v-btn color="primary">Add your first translation</v-btn>
    </empty-state>
    <custom-table
      :headers="headers"
      :items="getTranslationColumns"
      :total="listCount"
      :current-page="page"
      :row-selectable="true"
      @pageChanged="pageChanged"
    ></custom-table>
    <v-btn class="tw-fixed tw-bottom-24 tw-right-3" color="primary" fab dark @click="showForm = true">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
  import Loading from '@/components/loading/loading.vue';
  import EmptyState from '@/components/empty-state/empty-state';
  import CustomTable from '@/components/table/custom-table'
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: "translations",
    components: {
      EmptyState,
      Loading,
      CustomTable
    },
    data() {
      return {
        showForm: false,
        showLoading: false,
        page: 1,
        headers: [
          {
            name: 'key'
          },
          {
            name: 'translation'
          },
          {
            name: 'status'
          },
        ],
        labelColors: {
          approval_pending: 'warning',
          approved: 'success',
          rejected: 'danger',
          deprecated: 'light'
        }
      };
    },
    mounted() {
      this.getApplicationTranslations({
        languageCode: 'en',
        query: {},
      });
    },
    computed: {
      ...mapGetters({
        error: 'translation/error',
        listCount: 'translation/listCount',
        loaded: 'translation/loaded',
        translations: 'translation/translations',
      }),
      getTranslationColumns() {
        return this.translations.map(translation => {
          return {
            identifier: translation.alias,
            columns: [
              {
                value: translation.translationKey.alias,
              },
              {
                value: translation.translation,
              },
              {
                value: `<span class="tw-text-white tw-bg-${this.labelColors[translation.translationStatus.status]} tw-px-4 tw-py-1 tw-rounded-full">
                          ${translation.translationStatus.status}
                        </span>`,
              },
            ],
          };
        });
      },
    },
    methods: {
      ...mapActions({
        getApplicationTranslations: 'translation/getApplicationTranslations'
      }),
      async pageChanged(query) {
        await this.getApplicationTranslations({
          languageCode: 'en',
          query: {
            limit: query.totalPerPage,
            offset: query.totalPerPage * query.page - query.totalPerPage,
            search: query.search,
          },
        });

        this.page = query.page
      }
    }
  }
</script>
