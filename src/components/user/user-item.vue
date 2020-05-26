<template>
    <div>
        <v-card>
            <v-list-item-avatar
                    tile
                    size="80"
                    color="grey"
            ></v-list-item-avatar>
        </v-card>
    </div>
</template>

<script>
  export default {
    name: 'user-item',
    props: {
      userData: Object
    }
  }
</script>

<style scoped>

</style>
