export const state = () => ({
  image: {
    imgSrc: '',
    imgAlt: ''
  }
})

export const mutations = {
  insertImg(state, obj) {
    state.image.imgAlt = obj.imgAlt
    state.image.imgSrc = obj.imgSrc
  },
  clearImage(state) {
    state.image.imgAlt = ''
    state.image.imgSrc = ''
  }
}
