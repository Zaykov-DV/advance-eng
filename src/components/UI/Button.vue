<template>
  <button :class="['btn', `btn_${color}`,
                  {'btn_rounded' : rounded },
                  {'btn_outlined' : outlined },
                  {'btn_icon' : icon },
                  {'btn_without-text' : withoutText },
                  {'btn_small' : size === 'small' }]"
          :disabled="disabled"
          @click="clickOnButton()">
    <span v-if="withoutText">
      <font-awesome-icon :icon="`fa-solid fa-${icon}`"/>
    </span>
    <div class="btn__content" v-if="!withoutText">
      <font-awesome-icon v-if="iconLeft" :icon="`fa-solid fa-${icon}`" class="btn__icon btn__icon_left"/>
      <span>{{ label }}</span>
      <font-awesome-icon v-if="iconRight" :icon="`fa-solid fa-${icon}`" class="btn__icon btn__icon_right"/>
    </div>

  </button>

</template>

<script setup>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";


const props = defineProps({
  label: {
    type: String,
    default: 'Button'
  },
  color: {
    type: String,
    default: 'primary'
  },
  rounded: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  outlined: {
    type: Boolean,
    default: false
  },
  withoutText: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    required: false,
  },
  iconLeft: {
    type: Boolean,
    default: false
  },
  iconRight: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'normal'
  }
})

const emit = defineEmits(['click'])

const clickOnButton = () => {
  emit('click')
}

</script>


<style lang="scss" scoped>
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  height: 40px;
  color: #fff;
  border-radius: 7px;
  border: none;
  cursor: pointer;
  font-size: 15px;
  transition: .2s;

  &_primary {
    background: #116ACC;
    box-shadow: 0 0 0 1px #116ACC;

    &:hover {
      background: #B3CEE2;
    }
  }

  &:disabled {
    opacity: .6;
    cursor: default;
    pointer-events: none;
  }

  &_rounded {
    border-radius: 15px;
  }

  &_outlined {
    background: transparent;
    color: #fff;

    &:hover {
      color: #000;
    }
  }

  &_without-text {
    padding: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  &_small {
    height: 24px;
    width: 24px;
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__icon {

    &_left {
      margin-right: 4px;
    }

    &_right {
      margin-left: 4px;
    }
  }
}
</style>
