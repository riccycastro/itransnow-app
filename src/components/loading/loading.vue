<template>
    <div class="tw-absolute
            tw-h-full tw-w-full tw-z-10
            tw-content-center tw-flex tw-flex-wrap tw-justify-center
            tw-bg-white tw-bg-opacity-50" :class="{'tw-hidden': !showLoading}">
        <v-progress-circular
                :width="2"
                color="red"
                :size="70"
                indeterminate
        ></v-progress-circular>
    </div>
</template>

<script>
  export default {
    name: "loading",
    props: {
      showLoading: Boolean,
    }
  }
</script>

<style scoped>

</style>
