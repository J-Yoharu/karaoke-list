<template>
  <div class="auth-wrapper auth-v2">
    <div class="auth-inner">
      <!-- brand logo -->
      <router-link to="/" class="brand-logo d-flex align-center">
        <v-img :src="appLogo" max-height="30px" max-width="30px" alt="logo" contain class="me-3"></v-img>

        <h2 class="text--primary">
          {{ appName }}
        </h2>
      </router-link>
      <!--/ brand logo -->

      <v-row class="auth-row ma-0">
        <v-col lg="8" class="d-none d-lg-block position-relative overflow-hidden pa-0">
          <div class="auth-illustrator-wrapper">
            <div class="d-flex align-center h-full py-16 pe-0" style="position: relative">
              <v-img
                contain
                max-width="100%"
                height="692"
                class="auth-3d-group"
                :src="require(`@/assets/images/3d-characters/singer.png`)"
              ></v-img>
            </div>
          </div>
        </v-col>

        <v-col lg="4" class="d-flex align-center auth-bg pt-16">
          <v-row>
            <v-col cols="12" sm="8" md="6" lg="12" class="mx-auto">
              <v-card flat class="ma-0">
                <v-card-text>
                  <p class="text-2xl font-weight-semibold text--primary mb-2 text-center">Redefinir Senha 🔒</p>
                </v-card-text>
                <!-- login form -->
                <v-card-text>
                  <v-form ref="form" lazy-validation @submit.prevent="sendEmail">
                    <div v-for="(item, index) in steppers" :key="index" :step="index">
                      <p v-if="step == index">
                        {{ item.title }}
                      </p>

                      <component
                        :is="field.component"
                        v-for="(field, i) in item.fields"
                        :key="i"
                        v-model="user[field.model]"
                        v-if="step == index"
                        outlined
                        :type="field.type || 'text'"
                        :label="field.label"
                        :placeholder="field.placeholder"
                        :append-icon="field.appendIcon"
                        class="mb-3"
                        :rules="field.rules"
                      ></component>

                      <v-btn
                        block
                        color="primary"
                        class="mt-4"
                        @click="item.action.value"
                        :disabled="isLoading"
                        :loading="isLoading"
                        v-if="step == index"
                      >
                        {{ item.action.text }}
                      </v-btn>
                    </div>

                    <v-btn block color="error" class="mt-4 ml-0" @click="step = 0"> Cancelar </v-btn>
                  </v-form>
                </v-card-text>

                <!-- back to login -->
                <v-card-actions class="d-flex justify-center align-center mt-2">
                  <router-link :to="{ name: 'login' }" class="d-flex align-center text-sm">
                    <v-icon size="24" color="primary">
                      {{ icons.mdiChevronLeft }}
                    </v-icon>
                    <span>Voltar para login</span>
                  </router-link>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line object-curly-newline
import { mdiEmail, mdiChevronLeft, mdiKey } from '@mdi/js'
import { reactive, ref, watch, onMounted, computed } from '@vue/composition-api'
import themeConfig from '@themeConfig'
import { useRouter } from '@core/utils'
import { required, emailValidator } from '@core/utils/validation'
import {
  sendResetPasswordNotification,
  validCode,
  resetPassword as resetPasswordRepository,
} from '@/repositories/authRepository'
import { pushQueryParams } from '@/helpers/route'

export default {
  components: {
    VTextFieldC: () => import('vuetify/lib/components/VTextField'),
  },
  setup(props, { refs, parent }) {
    onMounted(() => {
      const params = new URLSearchParams(window.location.search)

      let userWithoutPassword = { ...user }
      delete userWithoutPassword.password
      delete userWithoutPassword.confirmPassword

      Object.keys(user).forEach(key => {
        user[key] = params.get(key) || ''
      })

      if (user.email || user.phone) step.value++

      if (user.code) step.value++
    })
    const { router } = useRouter()

    const user = reactive({ email: '', code: '', phone: '', password: '', confirmPassword: '' })

    const sendType = ref('email')

    const typeValue = computed(() => (sendType.value == 'email' ? user.email : user.phone))

    const email = ref('')

    watch(user, current => {
      let currentUserData = { ...current }
      delete currentUserData.password
      delete currentUserData.confirmPassword

      pushQueryParams(currentUserData)
    })

    const isLoading = ref(false)
    const step = ref(0)

    const rules = {
      required,
      emailValidator,
      confirmPassword: () => {
        return user.password == user.confirmPassword ? true : 'A senha de confirmação está diferente'
      },
    }

    const icons = {
      mdiEmail,
      mdiChevronLeft,
      mdiKey,
    }

    const isCurrentStep = index => {
      step.value == index
    }

    const sendEmail = () => {
      console.log(refs.form.validate())

      if (!refs.form.validate()) return

      isLoading.value = true

      sendResetPasswordNotification({ type: 'email', value: typeValue.value })
        .then(res => {
          step.value += 1
        })
        .catch(error => {
          parent.$toast.error(error.response.data)
        })
        .finally(_ => {
          isLoading.value = false
        })
    }

    const confirmCode = () => {
      if (!refs.form.validate()) return

      isLoading.value = true

      validCode({ code: user.code, value: typeValue.value })
        .then(res => {
          step.value += 1
        })
        .catch(error => {
          parent.$toast.error(error.response.data)
        })
        .finally(_ => {
          isLoading.value = false
        })
    }

    const resetPassword = () => {
      if (!refs.form.validate()) return

      isLoading.value = true
      resetPasswordRepository({ code: user.code, value: typeValue.value, password: user.password })
        .then(res => {
          router.push({ name: 'login' })
          parent.$toast.success('Senha redefinida com sucessso!')
        })
        .catch(error => {
          parent.$toast.error(error.response.data)
        })
        .finally(_ => {
          isLoading.value = false
        })
    }

    const steppers = [
      {
        title: 'Insira seu e-mail que enviaremos um código para você redefinir a sua senha',
        fields: [
          {
            model: 'email',
            component: 'VTextFieldC',
            label: 'Insira seu e-mail',
            placeholder: 'joao@exemplo.com',
            appendIcon: icons.mdiEmail,
            rules: [rules.required, rules.emailValidator],
          },
        ],
        action: {
          text: 'Enviar E-mail',
          value: sendEmail,
        },
      },
      {
        title: 'Insira o código que você recebeu em seu e-mail, verifique também a sua caixa de spam',
        fields: [
          {
            model: 'code',
            component: 'VTextFieldC',
            label: 'Insira o código',
            type: 'number',
            placeholder: '00000',
            appendIcon: icons.mdiKey,
            rules: [rules.required],
          },
        ],
        action: {
          text: 'Validar código',
          value: confirmCode,
        },
      },
      {
        title: 'Insira a sua nova senha e repita ela no próximo campo',
        fields: [
          {
            model: 'password',
            component: 'VTextFieldC',
            label: 'Nova Senha',
            type: 'password',
            placeholder: '',
            appendIcon: icons.mdiKey,
            rules: [rules.required],
          },
          {
            model: 'confirmPassword',
            component: 'VTextFieldC',
            label: 'Confirme a nova senha',
            type: 'password',
            placeholder: '',
            appendIcon: icons.mdiKey,
            rules: [rules.required, rules.confirmPassword],
          },
        ],
        action: {
          text: 'Redefinir Senha',
          value: resetPassword,
        },
      },
    ]

    return {
      user,
      email,
      isLoading,

      sendEmail,
      confirmCode,
      isCurrentStep,
      rules,

      // themeConfig
      appName: themeConfig.app.name,
      appLogo: themeConfig.app.logo,

      icons,
      step,
      steppers,
    }
  },
}
</script>

<style lang="scss">
@import '@core/preset/preset/pages/auth.scss';
</style>
