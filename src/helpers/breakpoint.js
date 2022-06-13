import vuetify from '@/plugins/vuetify'
import { computed } from '@vue/composition-api'

export const isMobile = computed(() => vuetify.framework.breakpoint.mobile)
