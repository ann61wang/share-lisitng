<template lang="html">
  <div class="swiper_area" @mouseleave="handleMouseLeave" ref="myWidth">
    <no-ssr>
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="(page, index) of pages" :key="index">
          <div class="category" v-for="(item, index) of page" :key="index">
            <img class="category-img" :src="item">
          </div>
        </swiper-slide>
        <div class="swiper-button-prev swiper-button-black hide" slot="button-prev"></div>
        <div class="swiper-button-next swiper-button-black" slot="button-next"></div>
      </swiper>
    </no-ssr>
    <div ref="left" class="iconfont icon_left">&#xeb8e;</div>
    <div ref="right" class="iconfont icon_right">&#xeb8a;</div>
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
      const pages = []
      this.imgs.forEach((item, index) => {
        let num = swiper.width / 187 - 1
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
        let rem = num % 187
        if(rem != 0) {
          if(num > 187) {
            let diff = 187 - rem
            let number = (diff > 63) ? (num - rem) : (num + diff)
            setTimeout(() => {
              swiper.setWrapperTranslate(-number+1)
              if(swiper.isEnd) {
                swiper.nextButton.addClass('hide')
                this.$refs.right.style.display = 'none'
              }
            }, 100)
          }
          if(num < 187) {
            if(187 - num > 63) {
              setTimeout(() => swiper.setWrapperTranslate(0), 100)
              swiper.prevButton.addClass('hide')
              this.$refs.left.style.display = 'none'
            }else {
              setTimeout(() => swiper.setWrapperTranslate(-186), 100)
              swiper.prevButton.removeClass('hide')
              this.$refs.left.style.display = 'block'
            }
          }
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .swiper_area >>> .swiper-slide
    width: auto !important

  .swiper_area >>> .swiper-button-prev
    height: 1.8rem !important
    margin-left: -3rem
    background: #fff
    padding: 2rem
    border-radius: 5rem

  .swiper_area >>> .swiper-button-next
    height: 1.8rem !important
    margin-right: -3rem
    padding: 2rem
    background: #fff
    border-radius: 5rem

  .swiper_area
    position: relative
    margin: 3rem 6.4rem
    height: 9vh
    .category
      display: inline-block
      .category-img
        display: inline-block
        height: 7.2rem
        width: 17.6rem
        background: red
        border-radius: .5rem
        margin: 0 .55rem
    .hide
      display: none
    .icon_left
      display: none
      color: #aaa
      font-size: 2.8rem
      position: absolute
      top: 1.8rem
      left: -1.2rem
      z-index: 2
    .icon_right
      color: #aaa
      font-size: 2.8rem
      position: absolute
      top: 1.8rem
      right: -1.2rem
      z-index: 2
</style>
