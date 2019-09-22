
export const state = () => ({
  listNum: [],
  session: '',
  labelShow: {},
  test: {
    imgAlt: '',
    imgSrc: '',
    titleCache: '',
    descCache: '',
    expire: 2
  },
  expire: 2
})

export const mutations = {
  changeImgAlt(state, inputValue) {
    state.test.imgAlt = inputValue
  },
  insertImg(state, obj) {
    state.test.imgAlt = obj.imgAlt
    state.test.imgSrc = obj.imgSrc
  },
  clearImgAlt(state) {
    state.test.imgAlt = ''
    state.test.imgSrc = ''
  },
  syncValue(state, value) {
    state.test.titleCache = value.title
    state.test.descCache = value.desc
  },
  syncList(state, items) {
    state.listNum = items
  },
  haveSession(state, id) {
    state.session = id
  },
  syncLabelShow(state, obj) {
    state.labelShow.subTitle = obj.subTitle
    state.labelShow.numMaker = obj.numMaker
    state.labelShow.boxShow = obj.boxShow
  },
  clearCacheAll(state) {
    state.labelShow = {}
    state.test = {}
  },
  clearSession(state) {
    state.session = ''
  }
}
