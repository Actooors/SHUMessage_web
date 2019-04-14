<template>
  <div
    class="wrapper"
  >
    <x-header ref="header" slot="header" class="theme-XHeader"
              :left-options="{showBack: true,backText:'',preventGoBack:true}"
              :right-options="{showMore: false}"
              @on-click-back="$emit('input',false)"
    >我的位置
      <div slot="right">
        <button class="button" @click="handleClickConfirm">确定</button>
      </div>
    </x-header>
    <el-amap-search-box
      ref="search"
      class="search-box"
      v-model="searchValue"
      :searchOption="searchOption"
      :on-search-result="onSearchResult"
    ></el-amap-search-box>
    <el-amap
      ref="map"
      vid="selectLocation"
      :amap-manager="amapManager"
      :zoom="17"
      :plugin="plugin"
      :events="events"
      :center="amapCenter"
      class="amap"
    >
      <el-amap-marker
        v-for="marker in markers"
        :key="marker.value"
        :position="marker"
      ></el-amap-marker>
    </el-amap>
    <p class="weui-cells__title checklistTitle">附近地点</p>
    <swiper :options="swiperOption" v-if="swiperOk">
      <swiper-slide class="text">
        <Radio
          :options="checkListOptions"
          v-model="checklistValue"
          class="checklist"
        >
        </Radio>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
  import {AMapManager} from 'vue-amap';
  import {ViewBox, XHeader, Radio} from 'vux'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import 'swiper/dist/css/swiper.css'

  let that;
  let amapManager;

  export default {
    name: "index",
    components: {
      ...{ViewBox, XHeader, Radio},
      ...{swiper, swiperSlide}
    },
    data: () => ({
      searchValue: "",
      searchOption: {
        city: "",
        citylimit: false
      },
      markers: [],
      swiperOk: false,
      swiperOption: {
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        mousewheel: true
      },
      checkListOptions: [],
      checkListSource: [],
      amapManager,
      loaded: false,
      checklistValue: 0,
      amapCenter: [0, 0],
      plugin: [{
        pName: 'Geolocation',
        enableHighAcuracy: true,
        timeout: 10000,
        maximumAge: 0,
        GeoLocationFirst: false,
        noGeoLocation: 3,
        events: {
          init(o) {
            console.log("?", o);
            // o 是高德地图定位插件实例
            o.getCurrentPosition((status, result) => {
              console.log("!!!", status, result);
              if (result && result.position) {
                that.searchOption.city = result.addressComponent.province;
                that.amapCenter = [result.position.lng, result.position.lat];
                that.loaded = true;
              } else {
                that.$toast({
                  text: "无法获得您的位置: " + result.message,
                  type: "error"
                });
                console.error(result.message)
              }
            }, ((error) => {
              that.$toast({
                text: "无法获得您的位置: " + error.message,
                type: "error"
              });
              console.error(error)
            }));
          }
        }
      }],
      events: {
        init: (o) => {
          AMapUI.loadUI(['misc/PositionPicker'], function (PositionPicker) {
            const positionPicker = new PositionPicker({
              mode: 'dragMap',//设定为拖拽地图模式，可选'dragMap'、'dragMarker'，默认为'dragMap'
              map: o//依赖地图对象
            });
            positionPicker.on('success', function (result) {
              result.regeocode.pois.length = result.regeocode.pois.length > 10 ? 10 : result.regeocode.pois.length;
              that.checkListSource = result.regeocode.pois;
              that.checkListOptions = result.regeocode.pois.map((x, i) => {
                return {key: i, value: x.name}
              });
              that.checklistValue = 0
            });
            positionPicker.start();
          });
        }
      }
    }),
    created() {
      amapManager = new AMapManager()
    },
    mounted() {
      that = this;
      this.calcCheckListHeight();
      document.querySelector('.search-box-wrapper input').addEventListener('input', this.handleKeywordChanged)
    },
    beforeDestroy() {
      document.querySelector('.search-box-wrapper input').removeEventListener('input', this.handleKeywordChanged)
    },
    methods: {
      handleKeywordChanged(event) {
        if (!event.target.value.length) {
          document.querySelector('.search-tips').style = "display: none";
        } else {
          document.querySelector('.search-tips').style = "";
        }
      },
      calcCheckListHeight() {
        const wh = document.querySelector('.wrapper').clientHeight;
        const hh = this.$refs.header.$el.clientHeight;
        const hm = this.$refs.map.$el.clientHeight;
        const ht = document.querySelector('.checklistTitle').offsetHeight;
        this.swiperOption.height = wh - hh - hm - ht - 10;
        this.swiperOk = true;
      },
      handleClickConfirm() {
        this.swiperOk = false;
        this.$emit('confirm', this.checkListSource[this.checklistValue]);
        this.$emit('input', false);
      },
      onSearchResult(pois) {
        let latSum = 0;
        let lngSum = 0;
        this.markers.length = 0;
        if (pois.length > 0) {
          const arr = Array.from(pois);
          arr.length = 3;
          arr.forEach(poi => {
            let {lng, lat} = poi;
            lngSum += lng;
            latSum += lat;
            this.markers.push([poi.lng, poi.lat]);
          });
          let center = {
            lng: lngSum / arr.length,
            lat: latSum / arr.length
          };
          // console.log(Math.sqrt((center.lng - arr[0].lng) * (center.lng - arr[0].lng) + (center.lat - arr[0].lat) * (center.lat - arr[0].lat)))
          // 如果前三的平均值较小，则取平均值，否则取第一个结果的值
          if (Math.sqrt((center.lng - arr[0].lng) * (center.lng - arr[0].lng) + (center.lat - arr[0].lat) * (center.lat - arr[0].lat)) < 0.0003) {
            this.amapCenter = [center.lng, center.lat];
          } else {
            this.amapCenter = [arr[0].lng, arr[0].lat];
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "../../assets/css/varies";

  .weui-cells_checkbox {
    font-size: 13px !important;
  }

  .weui-cells_checkbox .weui-icon-checked:before {
    font-size: 16px !important;
  }

  .checklist .weui-cells_checkbox:before {
    display: none;
  }

  .search-box .search-tips li {
    background-color: $--theme-gray-light5;
  }

  .search-box {
    opacity: .7;
  }
</style>

<style lang="scss" scoped>
  @import "../../assets/css/common";

  .wrapper {
    height: 100%;
    overflow-y: hidden;
  }

  .amap {
    height: 100vw;
    max-height: calc(50vh - 37px);
  }

  .theme-XHeader {
    z-index: 10000;
  }

  .button {
    @extend %button-basic;
    background: $--theme-blue;
    height: 24px;
    width: 54px;
    position: absolute;
    right: 0;
    font-size: 12px;
    color: white !important;
  }

  .checklistTitle {
    position: relative;
    margin-top: 0.3em !important;
    &:after {
      content: " ";
      position: absolute;
      left: 0;
      bottom: -0.4em;
      right: 0;
      height: 1px;
      border-top: 1px solid #D9D9D9;
      color: #D9D9D9;
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
  }

  .search-box {
    position: absolute;
    top: 47px;
    left: 0;
    width: 100%;
    z-index: 10001;
  }

  .amap-page-container {
    position: relative;
  }
</style>
