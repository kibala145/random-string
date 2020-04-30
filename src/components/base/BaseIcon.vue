<template>
  <svg
    :width="width"
    :height="height"
    :fill="fill"
  >
    <use v-bind:xlink:href="href"></use>
  </svg>
</template>

<script>

export default {
  name: 'BaseIcon',
  props: {
    type: {
      type: String,
      required: true
    },
    width: {
      type: String,
      default: '1.6rem'
    },
    height: {
      type: String,
      default: '1.6rem'
    },
    fill: {
      type: String,
      default: '#4F4F4F'
    }
  },
  computed: {
    href() {
      return `#${this.type}`
    }
  },
}
</script>