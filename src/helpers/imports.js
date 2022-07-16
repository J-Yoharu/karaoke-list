/**
 *
 * @param {*} context require.context do webpack
 * @param {*} ignoreFiles Nome dos arquivos a serem ignorados, pode ser string ou array ex: ['index']
 * @returns Retorna um objeto de arquivos importados
 */
export const importAll = (context, ignoreFiles = []) => {
  const cache = {}

  if (typeof ignoreFiles == 'string') ignoreFiles = [ignoreFiles]

  context.keys().forEach(key => {
    const { 0: archive } = key.match(/[a-z]\w+/) || []

    if (ignoreFiles.some(ignore => ignore == archive)) return

    if (archive) cache[archive] = context(key).default
  })

  return cache
}
