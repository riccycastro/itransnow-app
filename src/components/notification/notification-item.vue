<template>
    <v-alert :type="notification.type" :key="uid">
        {{message}} <a class="text-gray-600" @click="dismiss()">dismiss</a>
    </v-alert>
</template>

<script>
  export default {
    name: "notification-item",
    props: {
      notification: Object
    },
    data() {
      return {
        uid: this.notification.uid || '',
        message: this.notification.message || '',
        fixed: !!this.notification.fixed,
        timeout: this.notification.timeout || 3000,
      }
    },
    mounted() {
      if (!this.fixed) {
        setTimeout(() => {
          this.dismiss()
        }, this.timeout)
      }
    },
    methods: {
      dismiss() {
        this.$emit('dismiss', this.uid)
      }
    }
  }
</script>

<style scoped>

</style>
