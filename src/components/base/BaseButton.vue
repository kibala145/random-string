<template>
  <button
    :class="classObject"
    :disabled="disabled"
    @click.prevent.stop="onClick"
    @keydown="$emit('keydown', $event)"
  >
    <div class="base-button__content">
      <slot />
    </div>
  </button>  
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    accent: {
      type: Boolean,
      default: false
    },
    gray: {
      type: Boolean,
      default: false
    },
    transparent: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classObject() {
      return {
        'base-button': true,
        'base-button--accent': this.accent,
        'base-button--gray': this.gray,
        'base-button--transparent': this.transparent
      }
    }
  },
  methods: {
    onClick(e) {
      if(!this.disabled) this.$emit('click', e)
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/variables.scss';

.base-button {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  margin: 0;
  padding: .8rem .8rem;
  background-color: transparent;
  border-radius: 3.2rem;
  color: #42b983;
  border: .1rem solid #42b983;
  font-size: 1.6rem;
  &:active, &:focus, &:hover {
    border-color: #42b983bd;
    // outline: none;
  }
  transition: all .1s;
  &--accent {
    color: white;
    background-color: $color-green;
    font-weight: 600;
    border: none;
    &[disabled] {
      background-color: #BDBDBD;
    }
  }
  &--gray {
    color: $color-gray-1;
    background-color: $color-gray-3;
    border: none;
  }
  &--transparent {
    color: $color-gray-1;
    background-color: transparent;
    border: none;
  }
}
</style>