export default {
  data: () => ({
    scrollHeight: "",
    JBSticky: {
      node: [],
      nodeOriginParent: [],
      nodeOriginInsertPoint: [],
      nodeOffsetTop: [],
      offsetTop: 0,
      fixed: []
    }
  }),
  mounted() {
    this.$nextTick(() => {
      this.initScrollHeight()
      this.updateJBSticky({offsetTop: 0})
    })
  },
  methods: {
    initScrollHeight() {
      let tabbarHeight = Number(window.getComputedStyle(document.getElementById('tabbar'))['height'].replace(/px/, ''))
      let headerHeight = Number(window.getComputedStyle(document.getElementById('moments-XHeader'))['height'].replace(/px/, ''))
      this.scrollHeight = (-(tabbarHeight + headerHeight)).toString()
    },
    handlePulldownLoading() {
      console.log("pulldown")
      setTimeout(() => {
      }, 1000)
    },
    handlePullupLoading() {
      console.log("pullup")
      setTimeout(() => {
      }, 1000)
    },
    updateJBSticky({offsetTop = 0} = {}) {
      function pageY(e) {
        if (!e || (e.className === 'xs-container')) {//最多到这个容器就好了
          return 0;
        }
        // console.log(e.offsetTop)
        return e.offsetTop + pageY(e.parentElement);
      }

      //初始化各种属性
      let jbs = document.getElementsByClassName('justBar-box')
      this.JBSticky.node = new Array(jbs.length)
      this.JBSticky.nodeOriginParent = new Array(jbs.length)
      this.JBSticky.nodeOriginInsertPoint = new Array(jbs.length)
      this.JBSticky.nodeOffsetTop = new Array(jbs.length)
      this.JBSticky.fixed = new Array(jbs.length)
      this.JBSticky.offsetTop = offsetTop
      for (let i = 0; i < jbs.length; i++) {
        this.JBSticky.node[i] = jbs[i]
        this.JBSticky.nodeOriginParent[i] = jbs[i].parentElement
        this.JBSticky.nodeOriginInsertPoint[i] = jbs[i].previousSibling
        this.JBSticky.nodeOffsetTop[i] = pageY(jbs[i])
        this.JBSticky.fixed[i] = false
      }
    },
    handleScroll({top}) {
      let len = this.JBSticky.node.length
      for (let index = 0; index < len; index++) {
        let nodeHeight = this.JBSticky.node[index].offsetHeight
        if (this.JBSticky.nodeOffsetTop[index] < top + this.JBSticky.offsetTop//滑动超过justBar的头顶
          && !(index + 1 < len && top + this.JBSticky.offsetTop >= this.JBSticky.nodeOffsetTop[index + 1])//!(第一个justBar快要覆盖第二个justBar了)
        ) {
          if (!this.JBSticky.fixed[index]) {//fixed这个boolean是为了性能优化
            //伪fixed
            let header = document.querySelector('#moments-XHeader')
            header.parentElement.insertBefore(this.JBSticky.node[index], header.nextSibling)
            this.JBSticky.fixed[index] = true
          }
        } else if (this.JBSticky.fixed[index]) {
          //还原回去
          this.JBSticky.nodeOriginParent[index].insertBefore(this.JBSticky.node[index],
            this.JBSticky.nodeOriginInsertPoint[index] ? this.JBSticky.nodeOriginInsertPoint[index] : this.JBSticky.nodeOriginParent[index].firstChild)
          this.JBSticky.fixed[index] = false
        }
      }
    }
  }
}
