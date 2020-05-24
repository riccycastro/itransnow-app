<template>
    <div class="tw-mx-auto tw-max-w-md tw-text-center">
        <i class="material-icons tw-text-gray-500 tw-text-10xl tw-w-full">{{icon}}</i>
        <strong class="tw-w-full tw-font-medium tw-text-2xl">{{title}}</strong>
        <p>{{description}}</p>
        <slot>
        </slot>
    </div>
</template>

<script>
  export default {
    name: 'empty-state',
    props: {
      icon: String,
      title: String,
      description: String,
    }
  }
</script>
