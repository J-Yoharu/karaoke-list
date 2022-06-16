<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title> Informações do Usuário </v-card-title>

          <v-card-text>
            <v-row>
              <v-col cols="12" md="2" class="d-flex justify-center">
                <v-avatar size="100px" color="primary" class="v-avatar-light-bg primary--text">
                  <v-img v-if="user.photoURL" :src="user.photoURL"></v-img>
                  <v-icon v-else color="primary" size="28">
                    {{ icons.mdiAccountOutline }}
                  </v-icon>
                </v-avatar>
              </v-col>
              <v-col cols="12" md="8">
                <v-list dense>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="primary" v-if="true">{{ icons.mdiIdentifier }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <div>
                        <copy-label :text="user.uid" />
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="primary" v-if="true">{{ icons.mdiEmail }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <div>
                        <copy-label :text="user.email" />
                      </div>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="primary">{{ icons.mdiCellphone }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <div>
                        <copy-label :text="user.phoneNumber" v-if="user.phoneNumber" />
                        <span v-else> Celular não Cadastrado </span>
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>

                <v-text-field label="Nome" v-model="user.displayName" outlined dense> </v-text-field>

                <v-text-field label="Link Foto" v-model="user.photoURL" outlined dense> </v-text-field>

                <div class="d-flex justify-end">
                  <v-btn color="primary" @click="save" :loading="isLoading" :disabled="isLoading">Salvar</v-btn>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mdiEmail, mdiCellphone, mdiIdentifier } from '@mdi/js'
import { computed, ref } from '@vue/composition-api'
import CopyLabel from '@/components/CopyLabel.vue'
import { updateUser } from '@/repositories/userRepository'
import store from '@/store'

export default {
  components: {
    CopyLabel,
  },
  setup(props, { parent }) {
    const icons = {
      mdiEmail,
      mdiCellphone,
      mdiIdentifier,
    }

    const user = computed(() => store.state.user)
    const isLoading = ref(false)

    const save = () => {
      isLoading.value = false
      updateUser(user.value)
        .then(() => {
          store.dispatch('signIn', { ...user.value, skipRequest: true })
          parent.$toast.success('Perfil atualizado com sucesso!')
        })
        .catch(error => {
          console.log({ error })
        })
        .finally(() => {
          isLoading.value = false
        })
    }

    return {
      icons,
      user,

      save,
      isLoading,
    }
  },
}
</script>

<style></style>
