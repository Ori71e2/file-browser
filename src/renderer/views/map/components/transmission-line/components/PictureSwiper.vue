<template>
  <div class="container">
    <swiper ref="swiperTop" :options="swiperOption" class="swiper-inner">
      <!-- <swiper-slide v-for="(value, key) in picture" :key="key">
        <el-card class="box-card">
          <div class="slide-content">Slide {{ value }}</div>
        </el-card>
      </swiper-slide> -->
      <div slot="pagination" class="swiper-pagination"/>
      <div slot="button-prev" class="swiper-button-prev"/>
      <div slot="button-next" class="swiper-button-next"/>
    </swiper>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      picture: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      swiperOption: {
        effect: 'coverflow',
        // grabCursor: true,
        centeredSlides: true,
        // 虚拟slide必须确定数字
        slidesPerView: 5,
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
          slides: (function() {
            const slides = []
            for (let i = 0; i < 600; i += 1) {
              slides.push('Slide ' + (i + 1))
            }
            return slides
          }()),
          renderSlide: function(slide, index) {
            // <div class="swiper-slide"></div> 这个结构必须包含，不能缺少
            return '<div class="swiper-slide"">索引是' + index + '+内容是内容是内容是内容是内容是内容是内容是' + slide + '</div>'
          }
        }
      }
    }
  },
  mounted() {
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
  /* background-position: center;
  background-size: cover; */
  width: 300px !important;
  height: 280px;
}
.box-card {
  width: 100%;
  height: 100%;
}
</style>
