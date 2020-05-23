<template>
    <div class="notification tw-fixed tw-right-0 tw-top-0
    tw-h-64 tw-mt-16 tw-max-w-lg
    tw-z-10">
        <notification-item
                v-for="notification in notifications"
                :notification="notification"
                :key="notification.uid"
                @dismiss="dismiss">
        </notification-item>
    </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';
  import NotificationItem from "./notification-item";

  export default {
    name: "notification",
    components: {NotificationItem},
    computed: {
      ...mapGetters({
        notifications: 'base/notifications'
      })
    },
    methods: {
      ...mapActions({
        setNotifications: 'base/setNotifications'
      }),
      dismiss(notificationUid) {
        this.setNotifications(this.notifications.filter(notification => notification.uid !== notificationUid));
      }
    },
  }
</script>

