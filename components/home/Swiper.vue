<template lang="html">
  <div class="swiper_area adaptive" @mouseleave="handleMouseLeave" ref="myWidth" @mousewheel.prevent @touchmove.prevent>
    <no-ssr>
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="(page, index) of pages" :key="index">
          <div class="category" v-for="(item, index) of page" :key="index" style="position: relative;">
            <img class="category-img adaptive_img" :src="item">
            <!-- <span style="position: absolute; bottom: 0; left: 0;">{{index}}</span> -->
          </div>
        </swiper-slide>
      </swiper>
    </no-ssr>
    <div ref="left" class="iconfont icon_left icon_none" @click="handleLeftClick">&#xeb8e;</div>
    <div ref="right" class="iconfont icon_right icon_none" @click="handleRightClick">&#xeb8a;</div>
  </div>
</template>

<script>
export default {
  name: 'HomeSwiper',
  data () {
    return {
      isMounted: false,
      swiperOption: {
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        mousewheelControl: true,
        mousewheelSensitivity: .7,
        freeMode: true,
        observer: true,
        observeParents: true,
        spaceBetween: -2,
        slidesPerView: 'auto'
      },
      imgs: [
        "https://images.pexels.com/photos/1832715/pexels-photo-1832715.jpeg?auto=compress&crop=edges&cs=tinysrgb&fit=crop&h=375.0&w=1500",
        "https://images.pexels.com/photos/1832715/pexels-photo-1832715.jpeg?auto=compress&crop=edges&cs=tinysrgb&fit=crop&h=375.0&w=1500",
        "https://images.pexels.com/photos/1832715/pexels-photo-1832715.jpeg?auto=compress&crop=edges&cs=tinysrgb&fit=crop&h=375.0&w=1500",
        "https://images.pexels.com/photos/1832715/pexels-photo-1832715.jpeg?auto=compress&crop=edges&cs=tinysrgb&fit=crop&h=375.0&w=1500",
        "https://images.pexels.com/photos/1832715/pexels-photo-1832715.jpeg?auto=compress&crop=edges&cs=tinysrgb&fit=crop&h=375.0&w=1500",
        "https://images.pexels.com/photos/1832715/pexels-photo-1832715.jpeg?auto=compress&crop=edges&cs=tinysrgb&fit=crop&h=375.0&w=1500",
        "https://images.pexels.com/photos/1832715/pexels-photo-1832715.jpeg?auto=compress&crop=edges&cs=tinysrgb&fit=crop&h=375.0&w=1500",
        "https://images.pexels.com/photos/1832715/pexels-photo-1832715.jpeg?auto=compress&crop=edges&cs=tinysrgb&fit=crop&h=375.0&w=1500",
        "https://images.pexels.com/photos/1832715/pexels-photo-1832715.jpeg?auto=compress&crop=edges&cs=tinysrgb&fit=crop&h=375.0&w=1500",
        "https://images.pexels.com/photos/1832715/pexels-photo-1832715.jpeg?auto=compress&crop=edges&cs=tinysrgb&fit=crop&h=375.0&w=1500",
        "https://images.pexels.com/photos/1832715/pexels-photo-1832715.jpeg?auto=compress&crop=edges&cs=tinysrgb&fit=crop&h=375.0&w=1500",
        "https://images.pexels.com/photos/1832715/pexels-photo-1832715.jpeg?auto=compress&crop=edges&cs=tinysrgb&fit=crop&h=375.0&w=1500",
        "https://images.pexels.com/photos/1832715/pexels-photo-1832715.jpeg?auto=compress&crop=edges&cs=tinysrgb&fit=crop&h=375.0&w=1500"
      ]
    }
  },
  computed: {
    pages() {
      if(!this.isMounted)
        return

      let swiper = this.$refs.mySwiper.swiper
      let w = (swiper.width < 536) ? 112 : 187
      const pages = []
      this.imgs.forEach((item, index) => {
        let num = swiper.width / w - 1
        const page = Math.floor(index / num)
        if(!pages[page]) {
          pages[page] = []
        }
        pages[page].push(item)
      })
      return pages
    }
  },
  updated(){
    this.isMounted = true
  },
  methods: {
    handleMouseLeave() {
      let swiper = this.$refs.mySwiper.swiper
      let w = swiper.slides[0].firstChild.clientWidth
      // console.log(swiper.slides[0].firstChild.clientWidth)
      if(swiper.isBeginning){
        swiper.prevButton.addClass('hide')
        this.$refs.left.style.display = 'none'
      }else {
        swiper.prevButton.removeClass('hide')
        this.$refs.left.style.display = 'block'
      }
      if(swiper.isEnd) {
        swiper.nextButton.addClass('hide')
        this.$refs.right.style.display = 'none'
      }else {
        swiper.nextButton.removeClass('hide')
        this.$refs.right.style.display = 'block'
      }

      let num = swiper.translate
      if(num != 0) {
        num = Math.abs(num)
        num = Math.round(num)
        let rem = num % w
        if(rem != 0) {
          if(num > w) {
            let diff = w - rem
            let number = (diff > w/2) ? (num - rem) : (num + diff)
            setTimeout(() => {
              swiper.setWrapperTranslate(-number+1)
              if(swiper.isEnd) {
                swiper.nextButton.addClass('hide')
                this.$refs.right.style.display = 'none'
              }
            }, 100)
          }
          if(num < w) {
            if(w - num > w/2) {
              setTimeout(() => swiper.setWrapperTranslate(0), 100)
              swiper.prevButton.addClass('hide')
              this.$refs.left.style.display = 'none'
            }else {
              setTimeout(() => swiper.setWrapperTranslate(-w), 100)
              swiper.prevButton.removeClass('hide')
              this.$refs.left.style.display = 'block'
            }
          }
        }
      }
    },
    handleLeftClick() {
      let swiper = this.$refs.mySwiper.swiper
      swiper.slidePrev(false,300)
    },
    handleRightClick() {
      let swiper = this.$refs.mySwiper.swiper
      swiper.slideNext(false,300)
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
        background: red
        border-radius: .5rem
    .hide
      display: none
    @media (max-width: 37.5rem)
      .icon_none
        display: none !important
    .icon_left
      display: none
      color: #888
      font-size: 2.8rem
      position: absolute
      top: 1.8rem
      left: -2.2rem
      cursor: pointer
      background: #fff
      padding: 0 .6rem
      border-radius: 5rem
      z-index: 2
    .icon_right
      color: #888
      font-size: 2.8rem
      position: absolute
      top: 1.8rem
      right: -2.2rem
      padding: 0 .8rem
      cursor: pointer
      background: #fff
      border-radius: 5rem
      z-index: 2
</style>
