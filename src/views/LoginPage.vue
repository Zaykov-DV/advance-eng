<template>
  <div class="login">
    <form class="login__form" @submit.prevent>
      <Input class="login__input" v-model:value.trim="login" type="text" name="username" placeholder="username"
             width="180px" required/>
      <Input class="login__input" v-model:value.trim="v.password.$model" :error="v.password.$errors" name="password"
             placeholder="password" type="password" id="user_password" width="180px" required/>
      <div v-if="loginStore.isLoginError" class="login__alert">
        Проверьте правильность ввода логина или пароля
      </div>
      <Button class="login__btn" @click="loginStore.login({login, password})"
              :disabled="login.length === 0 || password.length === 0" label="Войти"/>
    </form>
  </div>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue'
import {useLoginStore} from '@/stores/login.js'
import useVuelidate from "@vuelidate/core";
import {helpers, minLength} from '@vuelidate/validators'
import Input from "@/components/UI/Input.vue";
import Button from "@/components/UI/Button.vue";

const login = ref<string>('')
const password = ref<string>('')

const loginStore = useLoginStore()

const rules = computed(() => ({
  password: {
    minLength: helpers.withMessage(`Минимальная длина: 8 символов`, minLength(8))
  }
}))

const v = useVuelidate(rules, {password})

</script>

<style lang="scss">
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;

  &__form {
    max-width: 350px;
    padding: 56px 130px 20px 40px;
    background: #D9D9D9;
  }

  &__alert {
    color: #BA0000;
    margin-top: 45px;
    margin-bottom: 20px;
  }

  &__input {
    margin-bottom: 32px;
  }

  &__btn {
    margin-top: 45px;
  }
}
</style>
