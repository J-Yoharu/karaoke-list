<template>
  <div class="auth-wrapper auth-v2">
    <div class="auth-inner">
      <!-- brand logo -->
      <router-link
        to="/"
        class="brand-logo d-flex align-center"
      >
        <v-img
          :src="appLogo"
          max-height="30px"
          max-width="30px"
          alt="logo"
          contain
          class="me-3 "
        ></v-img>

        <h2 class="text--primary">
          {{ appName }}
        </h2>
      </router-link>
      <!--/ brand logo -->

      <v-row class="auth-row ma-0">
        <v-col
          lg="8"
          class="d-none d-lg-block position-relative overflow-hidden pa-0"
        >
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

        <v-col
          lg="4"
          class="d-flex align-center auth-bg pt-16"
        >
          <v-row>
            <v-col
              cols="12"
              sm="8"
              md="6"
              lg="12"
              class="mx-auto"
            >
              <v-card flat>
                <v-card-text>
                  <p class="text-2xl font-weight-semibold text--primary mb-2">
                    Redefinir Senha 🔒
                  </p>
                  <p class="mb-2">
                    Insira seu e-mail que enviaremos um link para você redefinir a sua senha
                  </p>
                </v-card-text>

                <!-- login form -->
                <v-card-text>
                  <v-form ref="form" lazy-validation @submit.prevent="sendEmail">
                    <v-text-field
                      v-model="username"
                      outlined
                      label="Insira seu e-mail"
                      placeholder="joao@exemplo.com"
                      :append-icon="icons.mdiEmail"
                      class="mb-3"
                      :rules="[rules.required, rules.emailValidator]"
                    ></v-text-field>

                    <v-btn
                      block
                      color="primary"
                      class="mt-4"
                      type="submit"
                      :disabled="isLoading"
                      :loading="isLoading"
                    >
                      Enviar E-mail
                    </v-btn>
                  </v-form>
                </v-card-text>

                <!-- back to login -->
                <v-card-actions class="d-flex justify-center align-center mt-2">
                  <router-link
                    :to="{name:'login'}"
                    class="d-flex align-center text-sm"
                  >
                    <v-icon
                      size="24"
                      color="primary"
                    >
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
import { mdiEmail, mdiChevronLeft } from '@mdi/js'
import { ref } from '@vue/composition-api'
import themeConfig from '@themeConfig'
import { useRouter } from '@core/utils'
import { required, emailValidator } from '@core/utils/validation'
import { sendEmailResetPassword } from '@/repositories/authRepository'

export default {
  setup(props, { refs, parent }) {
    const { router } = useRouter()
    const username = ref('')
    const isLoading = ref(false)

    const rules = {
      required,
      emailValidator,
    }

    const sendEmail = () => {
      const validateForm = refs.form.validate()

      if (validateForm) {
        isLoading.value = true

        sendEmailResetPassword(username.value)
          .then(() => {
            parent.$alert.confirm(
              () => {
                router.push({ name: 'login' })
              },
              {
                icon: 'success',
                title: 'E-mail enviado com sucesso!',
                html: `<p> O e-mail para redefinir a sua senha foi encaminhado para ${username.value} com sucesso, por favor verifique também a sua caixa de spam </p>`,
                showConfirmButton: true,
                showCancelButton: false,
                confirmButtonText: 'Ok',
              },
            )
          })
          .catch(error => {
            console.log({ error })
          })
          .finally(() => {
            isLoading.value = false
          })
      }
    }

    return {
      username,
      isLoading,

      sendEmail,
      rules,

      // themeConfig
      appName: themeConfig.app.name,
      appLogo: themeConfig.app.logo,

      icons: {
        mdiEmail,
        mdiChevronLeft,
      },
    }
  },
}
</script>

<style lang="scss">
@import '@core/preset/preset/pages/auth.scss';
</style>
