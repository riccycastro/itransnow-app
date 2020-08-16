export const getLastUpdatedAtMixin = {
  methods: {
    /**
     * @param {string} updatedAt
     * @param {string} createdAt
     * @returns {string}
     */
    getLastUpdatedAtMixin_getLastUpdate(updatedAt, createdAt) {
      if (updatedAt) {
        return `updated at ${this.$options.filters.date(updatedAt)}`;
      }
      return `created at ${this.$options.filters.date(createdAt)}`;
    },
  },
}
