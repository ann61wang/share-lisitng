
export const state = () => ({
  image: {
    imgAlt: '',
    imgSrc: '',
    expire: 2
  },
  title: {
    titleCache: '',
    descCache: '',
    expire: 2
  },
  listNum: [],
  isNumMaker: false,
  listMessage: {},
  category: '其他',
  expire: 2
})

export const mutations = {
  changeImgAlt(state, inputValue) {
    state.image.imgAlt = inputValue
  },
  insertImg(state, obj) {
    state.image.imgAlt = obj.imgAlt
    state.image.imgSrc = obj.imgSrc
  },
  clearImgAlt(state) {
    state.image.imgAlt = ''
    state.image.imgSrc = ''
  },
  syncValue(state, value) {
    state.title.titleCache = value.title
    state.title.descCache = value.desc
  },
  syncList(state, items) {
    state.listNum = items
  },
  syncCategory(state, category) {
    state.category = category
  },
  syncListMessage(state, obj) {
    state.listMessage[String(obj.listIndex)] = obj
  },
  syncListObj(state, obj) {
    state.listMessage = obj
  },
  judgeIsNumMaker(state, bool) {
    state.isNumMaker = bool
  },
  clearCacheAll(state) {
    state.title = {}
    state.image = {}
    state.category = '其他'
    state.listMessage = {}
  },
  clearListMessage(state) {
    state.listMessage = {}
  }
}
