
export const state = () => ({
  session: '',
  refresh: false,
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
  category: 'other',
  listMessage: {},
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
  clearImage(state) {
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
  haveSession(state, id) {
    state.session = id
  },
  syncCategory(state, category) {
    state.category = category
  },
  syncListMessage(state, obj) {
    state.listMessage[String(obj.listIndex)] = obj
  },
  judgeIsNumMaker(state, bool) {
    state.isNumMaker = bool
  },
  yRefresh(state) {
    state.refresh = true
  },
  nRefresh(state) {
    state.refresh = false
  },
  clearCacheAll(state) {
    state.title = {}
    state.image = {}
    state.category = 'other'
    state.listMessage = {}
  },
  clearSession(state) {
    state.session = ''
  }
}
