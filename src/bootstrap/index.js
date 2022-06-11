import { importAll } from '@/helpers/imports'

let context = require.context('@/bootstrap', false, /\.js$/)

export default { ...importAll(context, 'index') }
