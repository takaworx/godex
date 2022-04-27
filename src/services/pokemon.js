import Vue from 'vue'

const like = (id) => {
  return new Promise((resolve, reject) => {
    Vue.axios.post('/v1/like', {
      _method: 'PUT',
      pokemon_id: id
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject((err?.response?.data) ?? err)
      })
  })
}

const dislike = (id) => {
  return new Promise((resolve, reject) => {
    Vue.axios.post('/v1/dislike', {
      _method: 'PUT',
      pokemon_id: id
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject((err?.response?.data) ?? err)
      })
  })
}

export default {
  like,
  dislike
}
