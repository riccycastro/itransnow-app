<template>
  <div>
    <div class="tw-flex">
      <v-select
        :items="perPageOptions"
        v-model="totalPerPage"
        v-on:change="totalPerPageChanged"
        class="tw-ml-auto tw-max-w-5xs tw-mr-8"
      ></v-select>
      <v-text-field
        v-model="searchValue"
        label="Search"
        prepend-icon="mdi-magnify"
        clearable
        v-on:keydown="searchValueChanged"
        v-on:click:clear="searchValueChanged"
        class="tw-max-w-md tw-mb-8"
      ></v-text-field>
    </div>

    <table class="tw-w-full tw-border-separate tw-bg-transparent">
      <thead>
      <tr>
        <th
          v-if="rowSelectable"
          class="tw-pl-8 tw-pr-4">
          <v-checkbox
            color="primary"
            hide-details
            class="tw-mb-5"
          ></v-checkbox>
        </th>
        <th
          v-for="(header, index) in headers"
          :key="index"
          class="tw-font-semibold tw-text-sm tw-uppercase tw-text-left tw-px-8">
          {{ header.name }}
        </th>
      </tr>
      </thead>
      <tbody>
      <custom-table-row
        v-for="(item, index) in items"
        :key="index"
        :row-selectable="rowSelectable"
        :item="item"
      ></custom-table-row>
      </tbody>
    </table>

    <div class="tw-flex tw-justify-end tw-select-none">
      <i
        @click="decreasePage"
        :class="{'tw-cursor-pointer hover:tw-bg-primary hover:tw-text-white tw-cursor-pointer tw-text-gray-600': leftArrowEnabled, }"
        class="material-icons tw-cursor-default tw-rounded-full tw-w-6 tw-h-6 tw-leading-6 tw-text-center tw-content-center tw-text-gray-500 tw-bg-gray-400 tw-mr-1">
        keyboard_arrow_left
      </i>
      <ul class="tw-bg-gray-400 tw-rounded-full">
        <li
          v-for="(pageNumber, index) in drawPaginateLinks"
          :key="index"
          @click="goToPage(pageNumber)"
          :class="{'tw-bg-primary tw-rounded-full': currentPage === pageNumber, 'tw-cursor-pointer': pageNumber !== '...', 'tw-mr-2': index < drawPaginateLinks.length - 1}"
          class="tw-float-left tw-leading-6 tw-w-6 tw-h-6 tw-cursor-default tw-text-center tw-text-sm tw-font-normal">
          {{pageNumber}}
        </li>
      </ul>
      <i
        @click="increasePage"
        :class="{'tw-cursor-pointer hover:tw-bg-primary hover:tw-text-white tw-cursor-pointer tw-text-gray-600': rightArrowEnabled, }"
        class="material-icons tw-cursor-default tw-rounded-full tw-w-6 tw-h-6 tw-leading-6 tw-text-center tw-content-center tw-text-gray-500 tw-bg-gray-400 tw-ml-1">
        keyboard_arrow_right
      </i>
    </div>
  </div>
</template>
<script>
  import CustomTableRow from "@/components/table/custom-table-row";

  export default {
    name: 'custom-table',
    components: {CustomTableRow},
    props: {
      headers: {
        type: Array,
        required: true,
      },
      items: {
        type: Array,
        required: true,
      },
      currentPage: {
        type: Number,
        default: 1,
      },
      total: {
        type: Number,
        required: true,
      },
      search: {
        type: String,
        default: '',
      },
      rowSelectable: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        page: this.currentPage,
        searchValue: this.search,
        totalPerPage: 10,
        perPageOptions: [10, 20, 30, 50, 100],
        searchTimeOut: this.makeDelay(300),
      }
    },
    computed: {
      drawPaginateLinks() {
        if (this.pageNumbers <= 7) {
          return Array.from({length: this.pageNumbers}, (_, i) => i + 1);
        }

        if (this.page < 4) {
          return [1, 2, 3, 4, '...', this.pageNumbers - 1, this.pageNumbers]
        }

        if (this.page > this.pageNumbers - 3) {
          return [1, 2, '...', this.pageNumbers - 3, this.pageNumbers - 2, this.pageNumbers - 1, this.pageNumbers]
        }

        return [1, '...', this.page - 1, this.page, this.page + 1, '...', this.pageNumbers];
      },
      leftArrowEnabled() {
        return this.page > 1
      },
      rightArrowEnabled() {
        return this.page < this.pageNumbers
      },
      pageNumbers() {
        return Math.ceil(this.total / this.totalPerPage);
      }
    },
    methods: {
      setPage(pageNumber) {
        this.page = pageNumber;
        this.$emit('pageChanged', this.getQuery());
      },
      getQuery() {
        return {
          page: this.page,
          totalPerPage: this.totalPerPage,
          search: this.searchValue
        };
      },
      goToPage(pageNumber) {
        if (pageNumber === '...') return;
        this.setPage(pageNumber);
      },
      decreasePage() {
        if (this.page === 1) return;
        this.setPage(this.page - 1);
      },
      increasePage() {
        if (this.page === this.pageNumbers) return
        this.setPage(this.page + 1);
      },
      totalPerPageChanged() {
        this.page = 1;
        this.$emit('pageChanged', this.getQuery());
      },
      searchValueChanged() {
        if (!this.searchValue || this.searchValue.length >= 3) {
          this.searchTimeOut(this.totalPerPageChanged)
        }
      },
      makeDelay(ms) {
        let timer = 0;
        return function (callback) {
          clearTimeout(timer);
          timer = setTimeout(callback, ms);
        };
      },
    },
  }
</script>

<style>
  table {
    border-spacing: 0 1rem;
  }

  .v-application ul, .v-application ol {
    padding-left: 0;
  }
</style>