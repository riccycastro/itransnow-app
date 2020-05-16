export const loaderMixin = {
  methods: {
    $_loaderMixin_loaderStart(container) {
      this.$vs.loading({
        container: container,
        scale: 0.6,
        type: 'sound',
      })
    },
    $_loaderMixin_loaderStop(container) {
      this.$vs.loading.close(container + ' > .con-vs-loading')
    },
  },
}
