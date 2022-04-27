import Vue from 'vue'

const ErrorHandler = {
  install (Vue) {
    Vue.mixin({
      data: () => ({
        errors: {}
      })
    })

    Vue.prototype.$errorHandler = function () {
      const vm = this

      return {
        set (val) {
          vm.errors = val
        },
        get (key) {
          return vm.errors[key] ?? []
        },
        clear () {
          vm.errors = {}
        }
      }
    }
  }
}

Vue.use(ErrorHandler)

export default ErrorHandler
