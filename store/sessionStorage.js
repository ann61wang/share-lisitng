
export const state = () => ({
  listNum: [],
  listCache: [],
  content: {},
  labelShow: {},
  test: {
    imgAlt: '',
    imgSrc: '',
    titleCache: '',
    descCache: ''
  }
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
  syncListCache(state, arr) {
    state.listCache = arr
  },
  syncTest(state, obj) {
    state.test = obj
  },
  syncLabelShow(state, obj) {
    state.labelShow.subTitle = obj.subTitle
    state.labelShow.numMaker = obj.numMaker
    state.labelShow.boxShow = obj.boxShow
  },
  syncContent(state, obj) {
    state.content[obj.id] = obj.content
  },
  clearCacheAll(state) {
    state.labelShow = {}
    state.test = {}
    state.listCache = []
  }
}
