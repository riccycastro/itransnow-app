<template>
    <div class="tw-content">
        <loading :showLoading="showLoading"></loading>
        <empty-state
                icon="web"
                title="Create your first section"
                description="Create your first section so you can add your translations"
                v-if="true">
            <v-btn color="primary">Create your first section</v-btn>
        </empty-state>
    </div>
</template>

<script>
  import Loading from '@/components/loading/loading.vue';
  import EmptyState from '@/components/empty-state/empty-state';

  export default {
    name: "sections",
    components: {
      Loading,
      EmptyState,
    },
    data() {
      return {
        showLoading: false,
      }
    },
  }
</script>
