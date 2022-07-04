import { mdiHomeOutline, mdiStarOutline, mdiUpdate } from '@mdi/js'

export default [
  {
    title: 'Home',
    icon: mdiHomeOutline,
    to: 'home',
  },
  {
    title: 'Todas as músicas',
    icon: mdiUpdate,
    to: 'all-musics',
    disable: true,
  },
  {
    title: 'Favoritos',
    icon: mdiStarOutline,
    to: 'favorite',
  },
  {
    title: 'Atualizações',
    icon: mdiUpdate,
    to: 'update',
  },
  {
    title: 'Atualizar músicas',
    icon: mdiUpdate,
    to: 'update-musics',
    disable: true,
  },
].filter(item => (item.disable && item.disable == true ? false : true))
