<template>
  <div class="base-input">
    <div class="base-input__base-text-field-container">
      <input
        ref="input"
        :id="`base-input-${_uid}`"
        class="base-text-field base-input__base-text-field"
        :type="type"
        :value="value"
        @input="onInput"
        @keydown="$emit('keydown', $event)"
        :placeholder="placeholder"
        autocomplete="off"
      />
      <label
        :for="`base-input-${_uid}`" 
        class="base-label base-input__base-label"
      >
        {{labelText}}
      </label>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BaseInput',
    props: {
      value: {
        type: String,
        default: 'Default input value',
        required: true
      },
      type: {
        type: String,
        default: 'text'
      },
      labelText: {
        type: String,
        default: 'Input label text'
      },
      placeholder: {
        type: String,
        default: 'Input placeholder'
      }
    },
    methods: {
      onInput($event) {
        this.$emit('input', $event.target.value)
      },
      focus() {
        this.$refs.input.focus()
      }
    },
    watch: {
      value(newVal) {
        this.$emit('change', newVal)
      }
    }
  }
</script>

<style lang="scss">
@import '@/assets/scss/variables.scss';

/*base-input*/
.base-input {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  padding-top: 2.2rem;
  padding-bottom: .4rem;
  &__base-label.base-label {
    position: absolute;
    transition: all .1s ease-in;
    transform: translate(0, 0);
    cursor: text;
  }
  &__base-text-field-container {
    display: flex;
    flex-direction: row;
    position: relative;
    border-bottom: .1rem solid $color-gray-3;
    &:focus-within, &:hover {
      border-color: $color-green;
    }
  }
  &__base-text-field {
    flex-grow: 1;
    outline: none;
    &::placeholder {
      transition: all .1s ease-in;
      opacity: 0;
      color: $color-gray-2;
    }
    &:focus, &:not(:placeholder-shown) {
      & + .base-label {
        transform: translate(0, -100%);
        padding-bottom: .4rem;
        font-size: 1.2rem;
      }
      &::placeholder {
        opacity: 1;
      }
    }
  }
}
/*base-label*/
.base-label {
  font-size: 1.4rem;
  color: $color-gray-2;
}
/*base-text-field*/
.base-text-field {
  border: none;
  font-size: 1.4rem;
  line-height: 1.8rem;
  color: $color-gray-1;
  padding-bottom: .6rem;
}
</style>