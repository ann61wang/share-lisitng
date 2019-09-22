<template lang="html">
  <div class="swiper_area adaptive" @mouseleave="handleMouseLeave" @touchend="handleMouseLeave" ref="myWidth" @mousewheel="handleMouseWheel($event)" @touchmove="handleMouseWheel($event)">
    <no-ssr>
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="(page, index) of pages" :key="index">
          <nuxt-link tag="div" class="category" v-for="(item, index) of page" :key="item.id" :to="'/collections/' + item.title">
            <div class="category_title">{{item.title}}</div>
            <img class="category-img adaptive_img" :src="item.imgUrl">
          </nuxt-link>
        </swiper-slide>
      </swiper>
    </no-ssr>
    <div :style="leftObj" class="iconfont icon_left icon_none icon_common" @click="handleLeftClick">&#xeb8e;</div>
    <div :style="rightObj" class="iconfont icon_right icon_none icon_common" @click="handleRightClick">&#xeb8a;</div>
  </div>
</template>

<script>
export default {
  name: 'HomeSwiper',
  data () {
    return {
      isMounted: false,
      swiperOption: {
        mousewheelControl: true,
        mousewheelSensitivity: .7,
        mousewheelForceToAxis: true,
        mousewheelInvert: true,
        freeMode: true,
        observer: true,
        // observeParents: true,
        spaceBetween: -2,
        slidesPerView: 'auto'
      },
      leftObj: {
        display: 'none'
      },
      rightObj: {
        display: 'block'
      },
      imgs: [{
        id: "0001",
        title: "旅游",
        imgUrl: "https://images.pexels.com/photos/1832715/pexels-photo-1832715.jpeg?auto=compress&crop=edges&cs=tinysrgb&fit=crop&h=375.0&w=1500"
      },{
        id: "0002",
        title: "教育",
        imgUrl: "https://images.pexels.com/photos/2531709/pexels-photo-2531709.jpeg?auto=compress&crop=focalpoint&cs=tinysrgb&fit=crop&h=350.0&sharp=10&w=1400"
      },{
        id: "0003",
        title: "体育",
        imgUrl: "https://images.pexels.com/photos/2064357/pexels-photo-2064357.jpeg?cs=srgb&dl=fruit-milk-splash-2064357.jpg&fm=jpg"
      },{
        id: "0004",
        title: "工作",
        imgUrl: "https://images.pexels.com/photos/1832715/pexels-photo-1832715.jpeg?auto=compress&crop=edges&cs=tinysrgb&fit=crop&h=375.0&w=1500"
      },{
        id: "0005",
        title: "梦想",
        imgUrl: "https://images.pexels.com/photos/1832715/pexels-photo-1832715.jpeg?auto=compress&crop=edges&cs=tinysrgb&fit=crop&h=375.0&w=1500"
      },{
        id: "0006",
        title: "电影",
        imgUrl: "https://images.pexels.com/photos/1832715/pexels-photo-1832715.jpeg?auto=compress&crop=edges&cs=tinysrgb&fit=crop&h=375.0&w=1500"
      },{
        id: "0007",
        title: "娱乐",
        imgUrl: "https://images.pexels.com/photos/1832715/pexels-photo-1832715.jpeg?auto=compress&crop=edges&cs=tinysrgb&fit=crop&h=375.0&w=1500"
      },{
        id: "0008",
        title: "美食",
        imgUrl: "https://images.pexels.com/photos/1832715/pexels-photo-1832715.jpeg?auto=compress&crop=edges&cs=tinysrgb&fit=crop&h=375.0&w=1500"
      },{
        id: "0009",
        title: "其他",
        imgUrl: "https://images.pexels.com/photos/1832715/pexels-photo-1832715.jpeg?auto=compress&crop=edges&cs=tinysrgb&fit=crop&h=375.0&w=1500"
     }]
    }
  },
  updated(){
    this.isMounted = true
  },
  computed: {
    swiper() {
      if(!this.isMounted)
        return

      return this.$refs.mySwiper.swiper
    },
    pages() {
      if(!this.isMounted)
        return
      //计算 slide 的个数
      let w = (this.swiper.width < 536) ? 112 : 187
      const pages = []
      this.imgs.forEach((item, index) => {
        //总是让 slide 装下 swiper 宽度减去一个图片区域的宽度，这样就可以点击箭头时，最后一个图片就是打头的图片
        let num = this.swiper.width / w - 1
        const page = Math.floor(index / num)
        if(!pages[page]) {
          pages[page] = []
        }
        pages[page].push(item)
      })
      return pages
    }
  },
  methods: {
    handleMouseLeave() {
      //获取不同屏宽的图片区域宽度
      let w = this.swiper.slides[0].firstChild.clientWidth
      //获取 wrapper 的位移
      let num = this.swiper.translate
      //在鼠标移出 swiper 区域时，使图片与 wrapper 贴合
      if(num != 0) {
        num = Math.abs(num)
        num = Math.round(num)
        let rem = num % w
        if(rem != 0) {
          if(num > w) {
            let diff = w - rem
            let number = (diff > w/2) ? (num - rem) : (num + diff)
            setTimeout(() => {
              this.swiper.setWrapperTranslate(-number+1)
              if(this.swiper.isEnd) this.rightObj.display = 'none'
            }, 100)
          }
          if(num < w) {
            if(w - num > w/2) {
              setTimeout(() => this.swiper.setWrapperTranslate(0), 100)
              this.leftObj.display = 'none'
            }else {
              setTimeout(() => this.swiper.setWrapperTranslate(-w), 100)
              this.leftObj.display = 'block'
            }
          }
        }
      }
      //让箭头在最左和最右隐藏
      this.leftObj.display = (this.swiper.isBeginning) ? 'none' : 'block'
      this.rightObj.display = (this.swiper.isEnd) ? 'none' : 'block'
    },
    handleLeftClick() {
      this.swiper.slidePrev(false,300)
    },
    handleRightClick() {
      this.swiper.slideNext(false,300)
    },
    handleMouseWheel(event) {
      if(this.swiper.isBeginning || this.swiper.isEnd)
        if (event) event.preventDefault()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .swiper_area >>> .swiper-slide
    width: auto !important
  @media (max-width: 90rem)
    .adaptive
      margin: 3rem 3.2rem
      height: 5rem
  @media (min-width: 90rem)
    .adaptive
      margin: 3rem 6.4rem
      height: 8rem
  .swiper_area
    position: relative
    .category
      display: inline-block
      cursor: pointer
      position: relative
      .category_title
        position: absolute
        left: 7.5rem
        top: 2.4rem
        z-index: 2
        font-size: 1.8rem
        font-weight: 600
        color: #fff
      @media (max-width: 37.5rem)
        .adaptive_img
          height: 4.8rem
          width: 10.4rem
          margin: 0 .4rem
      @media (min-width: 37.5rem)
        .adaptive_img
          height: 7.2rem
          width: 17.6rem
          margin: 0 .55rem
      .category-img
        display: inline-block
        border-radius: $borderRadius
        object-fit: cover
    @media (max-width: 37.5rem)
      .icon_none
        display: none !important
    .icon_common
      color: #888
      font-size: 2.8rem
      cursor: pointer
      background: $bgWhiteColor
      border-radius: 50%
      z-index: 2
    .icon_left
      position: absolute
      top: 1.8rem
      left: -2.2rem
      padding: 0 .6rem
    .icon_right
      position: absolute
      top: 1.8rem
      right: -2.2rem
      padding: 0 .8rem
</style>
