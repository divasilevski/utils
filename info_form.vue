<template lang="pug">
  form.info-form
    .info-form__input
      CustomInput(
        placeholder="Фамилия"
        v-model.trim="form.last_name"
        @input="infoInputs.last_name = $event;"
        :class="{ 'success': form.last_name }"
        name="last_name"
      )
    .info-form__input
      CustomInput(
        placeholder="Имя"
        v-model.trim='form.first_name'
        @input="infoInputs.first_name = $event; validate('first_name')"
        :error="formValidate.first_name.error"
        :class="{ 'success': !formValidate.first_name.error && form.first_name, 'error': formValidate.first_name.error }"
        name="first_name"
      )
    .info-form__input
      CustomInput(
        placeholder="Отчество"
        v-model.trim='form.patronymic'
        @input='infoInputs.patronymic = $event'
        :class="{ 'success': form.patronymic }"
        name="patronymic"
      )
    .info-form__input
      CustomInput(
        placeholder="e-mail"
        v-model.trim="form.email"
        @input="infoInputs.email = $event; validate('email')"
        :error="formValidate.email.error"
        :class="{ 'success': !formValidate.email.error && form.email, 'error': formValidate.email.error }"
        name="email"
      )
    .info-form__input
      CustomInput(
        placeholder="dd/mm/yyyy"
        type="date"
        v-model.trim='form.date_of_birth'
        @input='infoInputs.date_of_birth = $event'
        name="date_of_birth"
      )

    .info-form__field
      legend.info-form__label Пол:
      .info-form__radio
        CustomRadio(
          :options="genders"
          :selected="form.gender"
          @change="infoInputs.gender = $event"
          name="genders"
        )
      .info-form__input
        CustomDropdown(
          placeholder="Выберите часовой пояс"
          :options="timeOptions"
          :value="form.timezone"
          @change="infoInputs.timezone = $event"
          name='time'
          required="false"
        )
      .info-form__input
        CustomDropdown(
          placeholder="Выберите город"
          :options="cityOptions"
          :value="form.city ? form.city.id + '' : ''"
          @change='infoInputs.city_id = $event'
          name="city"
          required="false"
        )

    .info-form__field.info-form__field_notifications
      .info-form__label Уведомления:
      .info-form__input
        CustomCheckbox(
          v-model="form.is_notification"
          name="is_notification"
          @change="infoInputs.is_notification = $event"
        )
          | Присылать письмо о непрочитанных сообщениях от куратора {{ form.is_notification }}
      .info-form__radio
        CustomRadio(
          :options="notifications"
          :selected="form.notification_type"
          @change="infoInputs.notification_type = $event"
          :disabled="!form.is_notification"
          name="notifications"
        )

    button.btn__main(@click.prevent="updateDetails") Сохранить изменения
</template>

<script>
import { mapState } from 'vuex'
import api from '~/assets/api'

import CustomInput from '~/components/Inputs/CustomInput'
import CustomCheckbox from '~/components/Inputs/CustomCheckbox'
import CustomDropdown from '~/components/Inputs/CustomDropdown'
import CustomRadio from '~/components/Inputs/CustomRadio'

const genders = [
  { id: 'default', text: 'Не выбрано' },
  { id: 'm', text: 'Мужской' },
  { id: 'f', text: 'Женский' },
]

const notifications = [
  {
    id: 'now',
    text:
      'После каждого сообщения (если оно не было прочитано спустя 5 минут после отправки)',
  },
  { id: 'tomorrow', text: 'Раз в сутки (в 10:00 по вашему часовому поясу)' },
]

export default {
  components: {
    CustomInput,
    CustomCheckbox,
    CustomDropdown,
    CustomRadio,
  },
  data: () => ({
    genders,
    notifications,
    infoInputs: {},
    form: {},
    formValidate: {
      first_name: {
        error: null,
        validators: ['required'],
        humanFieldname: 'имя',
      },
      email: {
        error: null,
        validators: ['email', 'required'],
        humanFieldname: 'email',
      },
    },
  }),
  computed: {
    ...mapState('data', ['timeOptions', 'cityOptions']),
    user() {
      return { ...this.$store.state.user }
    },
  },
  watch: {
    user(value) {
      this.form = { ...value }
    },
  },
  created() {
    this.form = { ...this.user }
  },
  methods: {
    validate(fieldname) {
      this.formValidate[fieldname].error = ''
      const validators = this.formValidate[fieldname].validators
      const humanFieldname = this.formValidate[fieldname].humanFieldname

      for (const v of validators) {
        if (v === 'required') {
          if (!this.form[fieldname]) {
            this.formValidate[fieldname].error = `Поле ${
              humanFieldname || fieldname
            } обязательно для заполнения`
          }
        }

        if (v === 'email') {
          const patternEmail = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/

          if (!patternEmail.test(this.form[fieldname])) {
            this.formValidate[fieldname].error = `Поле ${
              humanFieldname || fieldname
            } должно быть действительным электронным адресом`
          }
        }
      }
    },
    isValid() {
      for (const field in this.formValidate) {
        if (this.formValidate[field].error) return false
      }
      return true
    },
    updateDetails() {
      if (!this.isValid()) return
      if (Object.keys(this.infoInputs).length === 0) return

      api.updateDetails(this.$axios, this.infoInputs).then((response) => {
        if ('city_id' in this.infoInputs) {
          this.infoInputs.city = { id: this.infoInputs.city_id }
        }
        this.$store.commit('UPDATE_USER', this.infoInputs)
      })
    },
  },
}
</script>
