<template>
  <div class="container">
    <swiper ref="pictureSwiper" :options="swiperOption" class="swiper-inner">
      <swiper-slide v-for="(value, key) in virtualData.slides" :key="key" :style="{left: `${virtualData.offset}px`}">
        <div class="box-card">
          <div class="slide-content">Slide {{ value }}</div>
          <img :src="value">
          <div class="swiper-lazy-preloader swiper-lazy-preloader-white"/>
        </div>
      </swiper-slide>
      <div slot="pagination" class="swiper-pagination"/>
      <div slot="button-prev" class="swiper-button-prev"/>
      <div slot="button-next" class="swiper-button-next"/>
    </swiper>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { fetchImagesList } from '@/api/amapImage'
export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      virtualData: {
        slides: []
      },
      slides: [],
      swiperOption: {
        effect: 'coverflow',
        // grabCursor: true,
        centeredSlides: true,
        // 虚拟slide必须确定数字
        slidesPerView: 5,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        // rotate：slide做3d旋转时Y轴的旋转角度。默认50。
        // stretch：每个slide之间的拉伸值，越大slide靠得越紧。 默认0。
        // depth：slide的位置深度。值越大z轴距离越远，看起来越小。 默认100。
        // modifier：depth和rotate和stretch的倍率，相当于depth*modifier、rotate*modifier、stretch*modifier，值越大这三个参数的效果越明显。默认1。
        // slideShadows：开启slide阴影。默认 true。
        coverflowEffect: {
          rotate: 10,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction'
        },
        virtual: {
          slides: [],
          addSlidesBefore: 3,
          addSlidesAfter: 3,
          // 与renderSlide不能共存
          renderExternal: this.virtualRenderExternal
        }
      }
    }
  },
  mounted() {
    fetchImagesList().then((response) => {
      const slides = response.data.data
      // slides.forEach(value => {
      //   this.$refs.pictureSwiper.swiper.virtual.appendSlide(value)
      // })
      // this.$refs.pictureSwiper.swiper.appendSlide(slides)
      // this.$refs.pictureSwiper.swiper.update()
      this.$refs.pictureSwiper.swiper.virtual.slides = slides
      this.$refs.pictureSwiper.swiper.virtual.update()
      this.$refs.pictureSwiper.swiper.slideTo(40)
    })
  },
  methods: {
    virtualRenderExternal(data) {
      this.virtualData = data
    }
  }
}
</script>

<style scoped>
.container {
  width: 90%;
  padding: 5px;
  margin: 5px;
}
.swiper-inner {
  width: 100%;
  height: 300px;
  padding-top: 10px;
  padding-bottom: 10px;
}
.swiper-slide {
  text-align: center;
  background: #444!important;
}
.swiper-slide img {
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  z-index: 100;
  -ms-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  position: absolute;
  left: 50%;
  top: 50%;
}
.box-card {
  width: 100%;
  height: 100%;
}
</style>
