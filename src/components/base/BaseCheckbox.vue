<template>
  <label class="base-checkbox">
    <input
      type="checkbox"
      :checked="value"
      @input="toggle"
      :disabled="disabled"
    />
    <base-icon
      class="mr-8 base-checkbox-icon"
      :type="value ? 'checkbox-checked' : 'checkbox-empty'"
      :fill="color"
      height="2.4rem"
      width="2.4rem"
    />
    <slot />
  </label>
</template>

<script>
export default {
  name: 'BaseCheckbox',
  props: {
    value: Boolean,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    color() {
      return this.disabled ? '#BDBDBD' : '#42B983'
    }
  },
  methods: {
    toggle() {
      if(this.disabled) return

      this.$emit('input', !this.value)
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/variables.scss';

.base-checkbox {
  display: inline-flex;
  flex-direction: row;
  align-items: flex-start;
  word-break: break-all;
}

.base-checkbox input {
  opacity: 0;
  position: absolute;
  width: 0;
  height: 0;
}
.base-checkbox svg {
  transition: transform .3s cubic-bezier(0.165, 0.84, 0.44, 1);
  flex-shrink: 0;
}
.base-checkbox:focus-within {
  svg {
    transform: scale(1.1);
  }
}
</style>