import firestore from '@/bootstrap/firestore'
import { addDoc, collection, doc, serverTimestamp, writeBatch } from 'firebase/firestore'

const collectionName = 'musics'

export const createMusic = (data = null, keyId = null) => {
  if (!data || typeof data == 'string' || typeof data == 'number' || !data.length)
    return new Promise((res, rej) => rej(`Tipo de dado inválido ${typeof data}`))

  return Array.isArray(data) ? createManyRef(data, keyId) : createRef(data, keyId)
}

/**
 *
 * @param {String} id ID do documento
 * @param {Object} data Dados a serem atualizados, para atualizar objetos aninhados utilize notação por ponto Ex: "user.address.name": "Address Name" ,
 * para atualizar um array específico utilize o arrayUnion() e deletar utilize o arrayRemove() do firebase/firestore
 * @returns {Promise}
 */
export const updateMusic = async (id, data = {}) => {
  const idRef = doc(firestore, collectionName, id)
  return updateDoc(idRef, { ...data, updated_at: serverTimestamp() })

  //  try {
  //    const newPopulation = await runTransaction(db, async transaction => {
  //      const sfDoc = await transaction.get(sfDocRef)
  //      if (!sfDoc.exists()) {
  //        throw 'Document does not exist!'
  //      }

  //      const newPop = sfDoc.data().population + 1
  //      if (newPop <= 1000000) {
  //        transaction.update(sfDocRef, { population: newPop })
  //        return newPop
  //      } else {
  //        return Promise.reject('Sorry! Population is too big')
  //      }
  //    })

  //    console.log('Population increased to ', newPopulation)
  //  } catch (e) {
  //    // This will be a "population is too big" error.
  //    console.error(e)
  //  }
}

function createManyRef(data = [], keyId = '') {
  const items = [...data]
  const maxRefPerBatch = 500
  const promises = []

  while (items.length) {
    const batch = writeBatch(firestore)

    let slice = items.splice(0, maxRefPerBatch)

    slice.forEach(item => {
      const ref = doc(firestore, collectionName, `${item[keyId]}`)
      batch.set(ref, { ...item, created_at: serverTimestamp(), updated_at: serverTimestamp() })
    })

    let promise = new Promise((resolve, reject) => {
      batch
        .commit()
        .then(data => resolve({ data }))
        .catch(error => reject({ error, batch: slice }))
    })

    promises.push(promise)
  }

  return Promise.allSettled(promises)
}

function createRef(data = {}, keyId = null) {
  if (keyId) {
    return setDoc(doc(firestore, collectionName, `${data[keyId]}`), {
      ...data,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    })
  }

  return addDoc(collection(firestore, collectionName), {
    ...data,
    created_at: serverTimestamp(),
    updated_at: serverTimestamp(),
  })
}
