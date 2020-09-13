<template lang="pug">
  .password-forms
    .password-form(v-if="status === 'CHANGE'")
      button.btn__main(@click="status = 'SETUP'") Изменить пароль

    .password-form(v-if="status === 'SETUP'")
      .password-form__input-wrapper
        .password-form__input
          CustomInput(
            placeholder="Текущий пароль"
            type="password"
            name="current_password"
            v-model="form.current_password"
            @input="validate('current_password')"
            @blur="validate('current_password')"
            :class="{ 'success': !formValidate.current_password.error && form.current_password, 'error': formValidate.current_password.error }"
          )
          .error-message
            .error-message__error {{ formValidate.current_password.error }}
            .error-message__space-value(@click.prevent="requestRecovery") Забыли пароль?
      button.btn__main(@click.prevent='requestResetPassword') Установить новый пароль

    .password-form(v-show="status === 'SAVE'")
      .password-form__input-wrapper
        .password-form__input
          CustomInput(
            placeholder="Новый пароль"
            type="password"
            name="password2"
            v-model="form.password"
            :caption="formValidate.password.hint"
            @input="validate('password')"
            @blur="validate('password')"
            :error="formValidate.password.error"
            :class="{ 'success': !formValidate.password.error && !formValidate.password.hint && form.password, 'error': formValidate.password.error}"
          )
        .password-form__input
          CustomInput(
            placeholder="Подтверждение пароля"
            type="password"
            v-model="form.password_confirmation"
            name="password_confirmation"
            @blur="validate('password_confirmation')"
            :error="formValidate.password_confirmation.error"
            :class="{ 'success': !formValidate.password_confirmation.error && form.password_confirmation, 'error': formValidate.password_confirmation.error }"
          )
      button.btn__main(@click.prevent="resetPassword") Сохранить пароль

    Overlay(v-if="isNotification" @close="isNotification = false")
      Notifications(v-if="isNotification" :items="items")
</template>

<script>
import CustomInput from '~/components/Inputs/CustomInput'

import api from '~/assets/api'

export default {
  components: {
    CustomInput,
  },
  data: () => ({
    status: 'CHANGE',
    form: {
      password: '',
      password_confirmation: '',
      current_password: '',
    },
    formValidate: {
      password: {
        error: '',
        hint: '',
        validators: ['password', 'required'],
      },
      password_confirmation: {
        error: '',
        hint: '',
        validators: ['confirmation', 'required'],
      },
      current_password: {
        error: '',
        hint: '',
        validators: ['required'],
      },
    },
    passwordInputs: {},
    token: undefined,
    isNotification: false,
    items: undefined,
  }),
  computed: {
    email() {
      return this.$store.state.user.email
    },
  },
  methods: {
    validate(fieldname) {
      this.formValidate[fieldname].error = ''
      this.formValidate[fieldname].hint = ''
      const validators = this.formValidate[fieldname].validators

      for (const v of validators) {
        if (v === 'required') {
          if (!this.form[fieldname]) {
            this.formValidate[
              fieldname
            ].error = `Поле обязательно для заполнения`
          }
        }

        if (v === 'password') {
          const pattern = /[A-Za-z0-9]{6,}/
          if (!pattern.test(this.form[fieldname]))
            this.formValidate[fieldname].hint =
              'От 6 символов, только латинские буквы и цифры'
        }

        if (v === 'confirmation') {
          if (this.form.password !== this.form[fieldname])
            this.formValidate[fieldname].error = 'Пароли не совпадают'
        }
      }
    },
    requestRecovery() {
      api.requestPasswordRecovery(this.$axios, this.email).then((response) => {
        if (response.status) {
          this.items = [
            {
              title: 'Сброс пароля',
              description:
                'На указанный E-mail выслана ссылка для сброса пароля.',
            },
          ]
          this.isNotification = true
        }
      })
    },
    requestResetPassword() {
      this.validate('current_password')
      if (this.formValidate.current_password.error) return

      // createFakeRequest
      setTimeout(() => {
        if (this.form.current_password === '123456') {
          this.formValidate.current_password.error = 'Неверный пароль'
        } else {
          this.token = 'flhagjsbdjasbdjabsdjbaskdabdjkbeb2u3hge8ry832gr'
          this.status = 'SAVE'
        }
      }, 200)
    },
    resetPassword() {
      this.validate('password')
      this.validate('password_confirmation')
      if (this.formValidate.password.error) return
      if (this.formValidate.password_confirmation.error) return
      if (!this.token) this.status = 'SETUP'

      const formData = {
        token: this.token,
        password: this.form.password,
        password_confirmation: this.form.password_confirmation,
      }
      api
        .resetPassword(this.$axios, formData)
        .then((response) => {
          this.items = [
            {
              title: 'Смена пароля',
              description: 'Пароль был успешно изменен.',
            },
          ]
          this.isNotification = true
          this.status = 'CHANGE'
        })
        .catch((error) => console.log(error))
    },
  },
}
</script>

<style lang="scss" scoped>
.password-forms {
  .password-form {
    .password-form__input-wrapper {
      margin-bottom: 10px;

      .password-form__input {
        margin-bottom: 10px;

        .error-message {
          display: flex;
          justify-content: space-between;
          margin-top: 5px;

          .error-message__error {
            font-size: 12px;
            line-height: 16px;
            color: #d12d2d;
          }
          .error-message__space-value {
            font-size: 12px;
            line-height: 16px;
            text-decoration-line: underline;
            color: #0ab6a1;

            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
