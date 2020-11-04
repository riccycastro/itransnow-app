<template>
  <tr
    @click="rowSelectable ? onSelect(true) : undefined"
    :class="{'tw-cursor-pointer': rowSelectable, 'tw-shadow-md': !selected}"
    class="tw-h-17 tw-mb-10 tw-transition-all tw-duration-300 tw-ease-in-out">
    <td
      v-if="rowSelectable"
      :class="{'tw-border-orange-600': selected}"
      class="tw-bg-white tw-pl-8 tw-pr-4">
      <v-checkbox
        v-model="selected"
        v-on:click="onSelect(false)"
        color="primary"
        hide-details
        class="tw-mb-5"
      ></v-checkbox>
    </td>
    <td
      v-for="(column, index) in item.columns"
      :key="index"
      v-html="column.value"
      class="tw-bg-white tw-px-8 tw-mb-10 tw-truncate tw-rounded-sm tw-font-normal">
      {{ column.value }}
    </td>
  </tr>
</template>

<script>
  export default {
    name: "custom-table-row",
    props: {
      item: {
        type: Object,
        required: true,
      },
      rowSelectable: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        selected: false,
      };
    },
    methods: {
      onSelect(rowClicked) {
        if (rowClicked) {
          this.selected = !this.selected;
        }
      },
    },
  }
</script>
