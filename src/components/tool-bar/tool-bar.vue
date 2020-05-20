<template>
    <div class="top-0 z-0 w-full h-17 grid grid-cols-2 py-3 px-4">
        <div class="flex content-center flex-wrap ml-2">
            <h1 class="font-light text-lg">{{$route.name|capitalize}}</h1>
        </div>
        <div class="flex content-center flex-wrap float-right">

        </div>
    </div>
</template>

<script>
  export default {
    name: "tool-bar"
  }
</script>

<style scoped>

</style>
