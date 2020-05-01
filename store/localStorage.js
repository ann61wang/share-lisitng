
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

export const getters = {
  initCOS(state) {
    if(process.browser) {
      var COS = require('cos-js-sdk-v5')
    }
    //没有存放在 state 中，因为必须在 mutations 中作更改，有点麻烦，应该返回一个新值，
    //并且可以在组件中直接更改 getters 中的值，且一个组件在首次使用时就调用一次，因此需要判断 cos 是否是 COS 的实例
    let cos = {}
    if(state.cos instanceof COS === false) {
      cos = new COS({
        getAuthorization: function (options,callback) { 
          let authorization = COS.getAuthorization({
            SecretId: 'AKIDINCh4EtmEX3S2Zerdw1rQn6NSJ5SlqdY',
            SecretKey: 'xz6DEE3dfT2QjKjy0mY8TabOfiaOybx5',
                Method: options.Method,
                Key: options.Key,
                Query: options.Query,
                Headers: options.Headers,
                Expires: 60,
              });
              callback(authorization);
        }
      })
    }
    return cos
  }
}

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
  updateListMessage(state, index) {
    delete state.listMessage[String(index)]
  },
  clearListMessage(state) {
    state.listMessage = {}
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
