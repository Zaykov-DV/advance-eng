<template>
  <header class="header">
    <div class="header__content">
      <Button label="Все заказы" outlined color="secondary"/>
      <Button @click="() => togglePopup('buttonTrigger')" label="Добавить заказ" outlined color="secondary"/>
    </div>
    <div class="header__content">
      <p class="header__name">{{ props.name }}</p>
      <Button @click="router.push('/login')" label="Выйти"/>
    </div>

    <Popup v-if="popupTriggers.buttonTrigger"
           :togglePopup="() => togglePopup('buttonTrigger')">
      <h2>Добавить заказ</h2>
      <Input type="text" placeholder="name" v-model:value="name"  name="name"/>
      <Input type="text" placeholder="address" v-model:value="address"  name="address"/>
      <Input type="text" placeholder="comment" v-model:value="comment"  name="comment"/>
      <div class="header__actions">
        <Button @click="eventStore.addEvent({name, address, comment }); reset()" label="Ок"/>
        <Button @click="() => togglePopup('buttonTrigger')" label="Отмена"/>
      </div>
    </Popup>
  </header>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {useEventStore} from "@/stores/events.js";
import router from "@/router";
import Popup from "@/components/UI/Popup.vue";
import Button from "@/components/UI/Button.vue";
import Input from "@/components/UI/Input.vue";

const eventStore = useEventStore()

const name = ref<string>('')
const address = ref<string>('')
const comment = ref<string>('')

const props = defineProps({
  name: String
})

// Popup
const popupTriggers = ref({
  buttonTrigger: false,
})

const togglePopup = (trigger: any) => {
  popupTriggers.value[trigger] = !popupTriggers.value[trigger]
}

const reset = () => {
  name.value = ''
  address.value = ''
  comment.value = ''
}
</script>

<style scoped lang="scss">
.header {
  background: #165996;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px;

  &__content {
    display: flex;
    align-items: center;
    color: #000;
  }

  &__name {
    margin-right: 30px;
  }

  &__actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 40px;
  }
}
</style>
