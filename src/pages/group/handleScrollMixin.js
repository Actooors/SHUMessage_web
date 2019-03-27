export default {
  data: () => ({
    XHeaderBackElement: null,
    galleryHeight: 0
  }),
  mounted() {
    this.XHeaderBackElement = document.getElementById("profile-XHeader-back");
    this.XHeaderBackElement.style.willChange = "background-position-y";
    this.galleryHeight = document.querySelector('.gallery').offsetHeight;
  },
  methods: {
    handleScroll(event) {
      let top = event.target.scrollTop;
      let that = this;
      //52是headbar的高度
      this.XHeaderBackElement.style.backgroundPositionY = `${-Math.min(top - 5, this.galleryHeight - 52 - 1)}px`;
      //drop-shadow, 47是sticky offset
      let tmp = this.galleryHeight - 10 - 47 - top;//距list-top的距离
      //将header的阴影渐渐过渡掉, 以免压到tab上面[使用if代替Math函数可能会有微弱的性能提升]
      if (tmp <= 0) {
        this.XHeaderBackElement.style.filter = '';
      } else if (tmp < 10) {
        this.XHeaderBackElement.style.filter = `drop-shadow(0px 5px 10px rgba(0,0,0,${(tmp * 0.03).toFixed(2)}))`;
      } else {
        this.XHeaderBackElement.style.filter = `drop-shadow(0px 5px 10px rgba(0,0,0,0.3))`;
      }
      //超过头像的时候浮现关注。gallery的padding-top为80px；头像即toprow，高64px；headbar高52px
      const keyY = 70 + 80 - 52;
      //如果top和scrollTop分布于keyY两端，则更改showHeaderInfo的状态
      if (((top - keyY) ^ (this.scrollStatus.scrollTop - keyY)) < 0) {
        let k = top - this.scrollStatus.scrollTop > 0;
        this.$nextTick(() => {
          that.showHeaderInfo = k;
        });
      }
      this.scrollStatus.scrollTop = top;
    }
  }
}
