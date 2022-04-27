import localforage from 'localforage'

const storage = localforage.createInstance({
  driver: localforage.LOCALSTORAGE,
  name: 'godex',
  version: 1,
  storeName: 'godex'
})

const getItem = (key) => {
  return new Promise((resolve, reject) => {
    storage.getItem(key, (err, value) => {
      if (err) {
        return reject(err)
      }

      return resolve(value)
    })
  })
}

const setItem = (key, value) => {
  return new Promise((resolve, reject) => {
    storage.setItem(key, value, (err, res) => {
      if (err) {
        return reject(err)
      }

      resolve(res)
    })
  })
}

export default {
  getItem,
  setItem
}
