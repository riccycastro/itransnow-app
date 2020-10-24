<template>
  <div class="tw-content">
    <loading :showLoading="showLoading"></loading>
    <empty-state
      icon="web"
      title="Create your first section"
      description="Create your first section so you can add your translations"
      v-if="loaded && !sections.length">
      <v-btn color="primary" @click="showForm = true">Create your first section</v-btn>
    </empty-state>
    <div class="tw-md-layout tw-grid lg:tw-grid-cols-3 md:tw-grid-cols-2 tw-gap-4 tw-grid-cols-1">
      <section-item
        v-for="section in sections"
        v-bind:sectionData="section"
        :key="section.alias"></section-item>
    </div>
    <v-btn class="tw-fixed tw-bottom-24 tw-right-3" color="primary" fab dark @click="showForm = true">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
      <section-create-form
        :showCreateForm="showForm"
        :showLoading="false"
        @triggerShowCreateForm="triggerShowCreateForm"
        @triggerShowLoading="triggerShowLoading"
      ></section-create-form>
  </div>
</template>

<script>
  import SectionItem from '@/components/section/section-item.vue';
  import SectionCreateForm from '@/components/section/section-create-form.vue';
  import Loading from '@/components/loading/loading.vue';
  import EmptyState from '@/components/empty-state/empty-state';
  import {mapActions, mapGetters} from 'vuex';

  export default {
    name: "sections",
    components: {
      Loading,
      EmptyState,
      SectionItem,
      SectionCreateForm,
    },
    data() {
      return {
        showForm: false,
        showLoading: false,
      }
    },
    mounted() {
      this.getApplicationSections();
    },
    computed: {
      ...mapGetters({
        loaded: 'section/loaded',
        sections: 'section/sections',
      }),
    },
    methods: {
      ...mapActions({
        getApplicationSections: 'section/getApplicationSections',
      }),
      triggerShowCreateForm() {
          this.showForm = !this.showForm;
      },
      triggerShowLoading() {
          this.showLoading = !this.showLoading
      },
    }
  }
</script>
