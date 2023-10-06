<template>
  <div class="input" :style="{width: width}" :class="{'floating': floatingLabel}">
    <label v-if="!floatingLabel" :for="name" class="input__label">{{ label }}</label>
    <input class="input__input"
           :class="{'with-icon': withIcon, 'has-error': error?.length}"
           :required="required"
           :type="type"
           :name="name"
           :value="value"
           :placeholder="placeholder"
           :label="label"
           :disabled="disabled"
           @input="$emit('update:value', $event.target.value)">
    <label v-if="floatingLabel" :for="name" class="input__label">{{ label }}</label>
    <div class="input__icon" :class="{'is-disabled' : disabled}" v-if="withIcon">
      <slot></slot>
    </div>
    <TransitionGroup>
      <div class="input__error"
           v-for="element of error"
           :key="element.$uid">
        <div class="input__error-message">{{ element.$message }}</div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
const emit = defineEmits(['update:value'])
const props = defineProps({
      value: {
        type: String,
        default: ''
      },
      name: {
        type: String,
        required: true
      },
      type: {
        type: String,
        default: 'text'
      },
      placeholder: {
        type: String,
        default: 'Placeholder',
      },
      label: {
        type: String,
        required: false
      },
      floatingLabel: {
        type: Boolean,
        default: false
      },
      required: {
        type: Boolean,
        default: false,
      },
      width: {
        type: String,
        default: '300px'
      },
      error: {
        type: Array,
        required: false
      },
      withIcon: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      }
    }
)
</script>

<style lang="scss" scoped>

.input {
  position: relative;

  &__input {
    width: 100%;
    max-height: 44px;
    outline: none;
    font-size: 16px;
    color: #1A051D;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 16px;
    border-radius: 7px;
    border: 1px solid #9CA3AF;
    background: #FFF;
    transition: border-color 0.3s ease-in-out;

    &.with-icon {
      padding-left: 40px;
    }

    &::placeholder {
      color: #D0C9D6;
    }

    &:valid, &:focus + .input__icon {
      border: 1px solid #ECEBED;
      color: #1A051D;
    }

    &.has-error {
      border: 1px solid #BA0000;
    }
  }

  &__label {
    display: block;
    margin-bottom: 4px;
    color: #4B5563;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;
  }

  &__icon {
    position: absolute;
    left: 16px;
    top: 38px;
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #D0C9D6;
    transition: color .6s;

    &.is-disabled {
      color: #b7b7b7;
    }
  }

  &__error {
    position: absolute;
    margin-top: 4px;
  }

  &__error-message {
    color: #BA0000;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
  }

  &.floating .input {
    &__input {
      transition: .6s;

      &:focus + label {
        color: #6979F8;
        transform: translate(10px, -12px);
        font-size: 12px;
        padding: 0 10px;
        background: #fff;
      }

      &::placeholder {
        opacity: 0;
      }
    }

    &__label {
      position: absolute;
      left: 0;
      top: 2px;
      padding: 10px;
      pointer-events: none;
      transition: .6s;
      margin-bottom: 0;
      text-transform: uppercase;
    }
  }
}


.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
