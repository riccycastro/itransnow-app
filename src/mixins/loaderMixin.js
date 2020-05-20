export const loaderMixin = {
  data() {
    return {
      loader: null,
    }
  },
  methods: {
    $_loaderMixin_loaderStart(container) {
      if (!this.loader) {
        this.loader = this.$loading.show({
          container: container,
          loader: 'spinner',
        })
      }
    },
    $_loaderMixin_loaderStop() {
      this.loader.hide();
      this.loader = null;
    },
  },
}
