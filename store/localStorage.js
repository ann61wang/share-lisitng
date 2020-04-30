
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
  cos: {},
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
  },
  pushImg(state, obj) {
    if(!state.cos.on) {
      if(process.browser) {
        var COS = require('cos-js-sdk-v5')
      }
      state.cos = new COS({
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

    state.cos.putObject({
      Bucket: 'sharelist-1255748781',
      Region: 'ap-guangzhou',
      Key: obj.imageAlt,
      Body: obj.selectedFile,
      onProgress: function (progressData) {
        console.log(JSON.stringify(progressData))
      }
    }, obj.callback)
  },
  clearCosImg(state, imageAlt) {
    if(process.browser) {
      var COS = require('cos-js-sdk-v5')
    }
    if(state.cos instanceof COS === false) {  
      state.cos = new COS({
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

    state.cos.deleteObject({
      Bucket: 'sharelist-1255748781',
      Region: 'ap-guangzhou',
      Key: imageAlt,
    }, (err, data) => {
      if(err) {
        console.log(err)
      }else {
        console.log(data)
      }
    })
  }
}
