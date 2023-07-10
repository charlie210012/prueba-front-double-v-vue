<template>
    <div>
      <div v-if="error" :class="alertClass" role="alert">
        {{ error }}
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      error: {
        type: String,
        required: true
      },
      type: {
        type: String,
        default: 'danger',
        validator: value => ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'].includes(value)
      }
    },
    computed: {
      alertClass() {
        return 'alert alert-' + this.type;
      }
    }
  };
  </script>
  
  <style scoped>
  .alert {
    margin-top: 10px;
  }
  </style>
  