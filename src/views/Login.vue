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
            <!-- triangle bg -->
            <!-- <img
              height="362"
              class="auth-mask-bg"
              :src="require(`@/assets/images/misc/mask-v2-${$vuetify.theme.dark ? 'dark' : 'light'}.png`)"
            /> -->

            <!-- tree -->
            <!-- <v-img
              height="226"
              width="300"
              class="auth-tree"
              src="@/assets/images/misc/tree-4.png"
            ></v-img> -->

            <!-- 3d character -->
            <div class="d-flex align-center h-full py-16 pe-0" style="position: relative;">
              <!-- <v-img
                contain
                max-width="100%"
                height="692"
                class="auth-3d-group"
                :src="require(`@/assets/images/3d-characters/group-${$vuetify.theme.dark ? 'dark' : 'light'}.png`)"
              ></v-img> -->
              <div class="text-image">
               
                Dessa marra que é gostar de você ieeeee
              </div>
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
          cols="12"
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
                    Bem vindo a sua lista de música! 👋🏻
                  </p>
                  <p class="mb-2">
                    Por favor faça autenticação para iniciarmos sua experiência 😎
                  </p>
                </v-card-text>

                <!-- login form -->
                <v-card-text>
                  <v-form ref="form" @submit.prevent="signIn">
                    <v-text-field
                      v-model="username"
                      outlined
                      label="Email"
                      placeholder="john@example.com"
                      class="mb-3"
                      :rules="[rules.required, rules.email]"
                    ></v-text-field>

                    <v-text-field
                      v-model="password"
                      outlined
                      :type="isPasswordVisible ? 'text' : 'password'"
                      label="Password"
                      placeholder="············"
                      :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
                      @click:append="isPasswordVisible = !isPasswordVisible"
                      :rules="[rules.required]"
                    ></v-text-field>

                    <v-btn
                      block
                      class="mt-6"
                      color="primary"
                      type="submit"
                      :disabled="isLoading"
                      :loading="isLoading"
                    >
                      Login
                    </v-btn>
                  </v-form>
                </v-card-text>

                <!-- create new account  -->
                <v-card-text >
                   <div class="d-flex align-center justify-center flex-wrap">
                      <!-- forget link -->
                      <router-link
                        :to="{ name: 'reset-password' }"
                        class="mt-1"
                      >
                        Esqueceu sua senha?
                      </router-link>
                    </div>
                  <div class="d-flex align-center justify-center flex-wrap">
                  <span class="me-2">
                    Ainda não possui sua conta?
                  </span>
                  <router-link :to="{ name: 'register'} ">
                    Clique aqui!
                  </router-link>

                  </div>
                </v-card-text>
                <!-- divider -->
                <v-card-text class="d-flex align-center mt-2" v-if="false">
                  <v-divider></v-divider>
                  <span class="mx-5">or</span>
                  <v-divider></v-divider>
                </v-card-text>

                <!-- socail links -->
                <v-card-actions class="d-flex justify-center" v-if="false">
                  <v-btn
                    v-for="link in socialLink"
                    :key="link.icon"
                    icon
                    class="ms-1"
                  >
                    <v-icon :color="$vuetify.theme.dark ? link.colorInDark : link.color">
                      {{ link.icon }}
                    </v-icon>
                  </v-btn>
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
import { mdiFacebook, mdiTwitter, mdiGithub, mdiGoogle, mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js'
import { ref } from '@vue/composition-api'
import themeConfig from '@themeConfig'
import { useRouter } from '@core/utils'
import { signIn as login } from '@/repositories/authRepository'
import { required, email } from '@/plugins/validation'
import FirebaseException from '@/exceptions/FirebaseException'
import store from '@/store'

export default {
  setup(initProps, { refs, parent }) {
    const { router } = useRouter()
    const isPasswordVisible = ref(false)
    const username = ref('')
    const password = ref('')

    const isLoading = ref(false)
    const socialLink = [
      {
        icon: mdiFacebook,
        color: '#4267b2',
        colorInDark: '#4267b2',
      },
      {
        icon: mdiTwitter,
        color: '#1da1f2',
        colorInDark: '#1da1f2',
      },
      {
        icon: mdiGithub,
        color: '#272727',
        colorInDark: '#fff',
      },
      {
        icon: mdiGoogle,
        color: '#db4437',
        colorInDark: '#db4437',
      },
    ]

    const rules = {
      required,
      email,
    }

    const res = {
      user: {
        uid: 'OC1Jbbxwv8cJrNzKVsSey5V3Awc2',
        email: 'joaneto@haoc.com.br',
        emailVerified: false,
        isAnonymous: false,
        providerData: [
          {
            providerId: 'password',
            uid: 'joaneto@haoc.com.br',
            displayName: null,
            email: 'joaneto@haoc.com.br',
            phoneNumber: null,
            photoURL: null,
          },
        ],
        stsTokenManager: {
          refreshToken:
            'AIwUaOlO7-1GmFs6FGPGLnG7dtZ0wZkohx5DjmmcYp0TZZEmjbGN9AHnwWKNBfrZO6CZEqETePki_QcIiwGrRnQDDnn5LZ3GHEnT4JEwIvuCitJnQVcM04E2FIw82LUK-i0T1gkOuWXUFZGS3zkTAInJCx4uhvCSUuaCSDPtNWBOm3MYZy5nxU7D5Q4QiNAvf2FllFX9mFqKX_vSEUx_uf8QC2maJRmdxA',
          accessToken:
            'eyJhbGciOiJSUzI1NiIsImtpZCI6IjFhZWY1NjlmNTI0MTRlOWY0YTcxMDRiNmQwNzFmMDY2ZGZlZWQ2NzciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20va2FyYW9rZS1mOWJmMSIsImF1ZCI6ImthcmFva2UtZjliZjEiLCJhdXRoX3RpbWUiOjE2NTQ5ODU0NjQsInVzZXJfaWQiOiJPQzFKYmJ4d3Y4Y0pyTnpLVnNTZXk1VjNBd2MyIiwic3ViIjoiT0MxSmJieHd2OGNKck56S1ZzU2V5NVYzQXdjMiIsImlhdCI6MTY1NDk4NTQ2NCwiZXhwIjoxNjU0OTg5MDY0LCJlbWFpbCI6ImpvYW5ldG9AaGFvYy5jb20uYnIiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiam9hbmV0b0BoYW9jLmNvbS5iciJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.w0vjomFIkSd0_fl0g4xTu6bpC5i5LDU4ZLdOOKZAjlHQ8RACSMgQMMyFJ084iNFgpKe5ykBnx96QnZsoftGzkPQF2ig1_RC7zR9xfoRdF3gB0BVuU7pXk1CBi5EXx_g3HcwtYgmq5830NrhrxRDbbwQmT0GAVkI1mIcWFQ34KHUfzdHcGsV2C36wBZp2utl8t5WnkG_nJ2ELLO903rpLwaDYOhXJm-_oToKxgBl0DYvWMsqIb2-lU6TbG4ntAfub--wNtUpJ5WCylLGFoiun2aB363cQwF90Xmpi_u-PMXRagS3bDlj9Xxyf5K1BYIclQ2az0iw8myVAPhYUmkgvFA',
          expirationTime: 1654989064740,
        },
        createdAt: '1654959994303',
        lastLoginAt: '1654985464633',
        apiKey: 'AIzaSyAVXY9S7rwzxmDUZvMJd5EF9erYlIU24kA',
        appName: '[DEFAULT]',
      },
      providerId: null,
      _tokenResponse: {
        kind: 'identitytoolkit#VerifyPasswordResponse',
        localId: 'OC1Jbbxwv8cJrNzKVsSey5V3Awc2',
        email: 'joaneto@haoc.com.br',
        displayName: '',
        idToken:
          'eyJhbGciOiJSUzI1NiIsImtpZCI6IjFhZWY1NjlmNTI0MTRlOWY0YTcxMDRiNmQwNzFmMDY2ZGZlZWQ2NzciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20va2FyYW9rZS1mOWJmMSIsImF1ZCI6ImthcmFva2UtZjliZjEiLCJhdXRoX3RpbWUiOjE2NTQ5ODU0NjQsInVzZXJfaWQiOiJPQzFKYmJ4d3Y4Y0pyTnpLVnNTZXk1VjNBd2MyIiwic3ViIjoiT0MxSmJieHd2OGNKck56S1ZzU2V5NVYzQXdjMiIsImlhdCI6MTY1NDk4NTQ2NCwiZXhwIjoxNjU0OTg5MDY0LCJlbWFpbCI6ImpvYW5ldG9AaGFvYy5jb20uYnIiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiam9hbmV0b0BoYW9jLmNvbS5iciJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.w0vjomFIkSd0_fl0g4xTu6bpC5i5LDU4ZLdOOKZAjlHQ8RACSMgQMMyFJ084iNFgpKe5ykBnx96QnZsoftGzkPQF2ig1_RC7zR9xfoRdF3gB0BVuU7pXk1CBi5EXx_g3HcwtYgmq5830NrhrxRDbbwQmT0GAVkI1mIcWFQ34KHUfzdHcGsV2C36wBZp2utl8t5WnkG_nJ2ELLO903rpLwaDYOhXJm-_oToKxgBl0DYvWMsqIb2-lU6TbG4ntAfub--wNtUpJ5WCylLGFoiun2aB363cQwF90Xmpi_u-PMXRagS3bDlj9Xxyf5K1BYIclQ2az0iw8myVAPhYUmkgvFA',
        registered: true,
        refreshToken:
          'AIwUaOlO7-1GmFs6FGPGLnG7dtZ0wZkohx5DjmmcYp0TZZEmjbGN9AHnwWKNBfrZO6CZEqETePki_QcIiwGrRnQDDnn5LZ3GHEnT4JEwIvuCitJnQVcM04E2FIw82LUK-i0T1gkOuWXUFZGS3zkTAInJCx4uhvCSUuaCSDPtNWBOm3MYZy5nxU7D5Q4QiNAvf2FllFX9mFqKX_vSEUx_uf8QC2maJRmdxA',
        expiresIn: '3600',
      },
      operationType: 'signIn',
    }

    const signIn = () => {
      if (refs.form.validate()) {
        isLoading.value = true

        login(username.value, password.value)
          .then(res => {
            store.dispatch('signIn', res)
            router.push({ name: 'home' })
          })
          .catch(error => {
            error = new FirebaseException(error)
            parent.$toast.error(error.message)
          })
          .finally(() => {
            isLoading.value = false
          })
      }
    }

    return {
      isPasswordVisible,
      username,
      password,
      socialLink,

      signIn,
      rules,
      isLoading,

      // themeConfig
      appName: themeConfig.app.name,
      appLogo: themeConfig.app.logo,

      icons: {
        mdiEyeOutline,
        mdiEyeOffOutline,
      },
    }
  },
}
</script>

<style lang="scss">
@import '@core/preset/preset/pages/auth.scss';
.text-image {
  position: absolute;
  top: calc(33% - 24px);
  left: calc(50% - 70px);
  text-align: center;
  max-width: 15%;
}
</style>
