<template functional>
  <transition 
    :name="props.name"
    :mode="props.mode"
  >
    <slot />
  </transition>
</template>
<script>
export default {
  name: 'BaseTransition',
  props: {
    name: {
      type: String,
      default: 'fade',
      validator(value) {
        return ['fade', 'slide-right', 'slide-left'].includes(value)
      }
    },
    mode: {
      type: String,
      default: 'out-in'
    }
  }
}
</script>

<style style="scss">
  /* fade */
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  /* slide-right slide-left */
  .slide-right-enter-active, .slide-right-leave-active, .slide-left-enter-active, .slide-left-leave-active {
    transition: all .5s;
  }
  .slide-right-leave-to {
    transform: translateX(100%);
  }
  .slide-right-enter {
    transform: translateX(-100%);
  }
  .slide-left-enter {
    transform: translateX(100%);
  }
  .slide-left-leave-to {
    transform: translateX(-100%);
  }
</style>