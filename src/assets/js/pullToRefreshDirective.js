//可传入指令一个返回promise的函数
import PullToRefresh from 'pulltorefreshjs';
import Vue from 'vue';
import {Spinner, Icon} from 'vux'

const directive = {
  inserted(el, {value}, vnode) {
    //加个条件判断以兼容vux的view-box
    if (vnode.componentInstance.$options.name === "view-box") {
      el = vnode.componentInstance.getScrollBody();
    }

    el.__pullToRefresh = PullToRefresh.init({
      mainElement: el,
      triggerElement: el,
      distMax: '80',
      distThreshold: '70',
      distReload: '70',
      refreshTimeout: 0,
      classPrefix: 'pulltorefresh--',
      instructionsPullToRefresh: '嗷～ 被你发现了～',
      instructionsReleaseToRefresh: '呜呜呜T.T 放了我吧',
      instructionsRefreshing: '一闪一闪亮晶晶',
      async onRefresh(reset) {
        //调用下拉刷新
        if (typeof value === 'function') {
          el.__pullToRefresh_iconVue.loading = true;
          const promise = value();
          if (promise) {
            const minDelay = new Promise(resolve => {
              setTimeout(() => {
                resolve();
              }, 500)
            });
            await Promise.all([promise, minDelay])
            Vue.$vux.toast.show({
              text: `<div class="greenStyle"><img height="24" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAJsklEQVR42u2ae3BU1R3HP7/dZHklojj4yAJSBVuxUEQZH1VHcRAJ98Zh2qoQbC2tj2qniradTkfrq6N26lSrgNpqlZItVUoR7kmVVkXEN1VEKpQiyCNBRUmMCZvH7t5f/9izySVNYh67Eaf7+2fvOXsfv9/3/N7nQJ7ylKc85SlPecrT/ylJf33IcZwhwJeA8SJyAnAYMMj+3QjUAptUdSOwwxiz/wsPgOM4w0TkHOCbwBnAqG58U4FdwEvAUlVdY4yp/UIB4LruKOAa4DLgiA5uiQMNQMKOC4EiYHAH934I/AFY6Hle1UENwIwZM4pEZJ6IzLMqnqEaYK2qPgu8AewWkQZVTQCISAaAkap6ioicB5zV/h2qejdwXzbNQ7Ko7pNE5DFgfGB6PfCAqq4wxuztoRYdCVxoNWlCwDw2AN/xPO/tgwKA6dOnSzgcniUiC4BD7fQW4GfA057nNfUR2EEiUgrcBYyx0/uAqzzP+8vnCoDjOCHgOhG5y9pxAligqrcaYz45wLNVl4eAEcBkkPH2OqPitUAVsBHRdUCVlMT8DhzqbcCVQAHQrKrXAw8aY/x+B8BxHBGRHwN3AmErxPeB5Z7naavgVXOGIsy2keDrQKSL7yrQDLwMLEV0iZTE6oKAi8hFwEPAIUAKmOf7/vzKykrtVwBc170M+L1djY9U9SJjzPMBwQsQLgZuA47t5We2ATcDj0u0IhkAYpqILLEa1KKqc4wxS/sNAMdxJorI88BQoFZVZxpj1rSp+5xRwD3AzCz4GR94EvQ6icZ2BxZgGvCE1YSPVfUsY8y/cw6A67qDgbXAJGvzl3ie99fAyk9AeNJmfdmk7cBMiVa8HeDlUuBRa4IvAed5ntfck5eGesHIdcBJ9npBKpVaHlj5ExGezoHwWDN6SqvLx2UmkslkDHjMDs9Q1StyqgGO44wUkbeAYcAWVT0t4+11T3kJKquB43Ocvm9BOFdKKt63PB0hIutsmv2Bqk4wxnyUEw0Qkaus8AA/DQhfgMo9/SA8wJdR7tHq8gIAm2DdaP87SkS+mxMTcBznMGCuHb6mqqvagpfMtGGuv+hb1sFmaBmw2V5f6bpuUdYBsPn5UXZ4vzGmOb36cwYBN7V/lyokk72XsL7BZ/mqRjZuSXTCt9yoe8oHAXieFwcWBnzF6VkFwHVdAS7JpKEHrj4Xtsv/AVj1QhM33FnP5ncTvQLglfUtPLq8hfmLG0l1nOdNQKUsMF5hK0yAi7KtAUUBVNcaYz4G0PfnCDC7owfWvJ7gvWqf2xc2smlrz0FI2EdaEpBMdprkzdI9c8RqaBXwpp0/23GcgdkE4DigxF7/PbD6hwNT/id925kkHE4HmIa48ssH4p2pcl/pPNBhACtXrlTgH3Z+DHB0NgH4Sptt65sBQz8p0NZqtf1HlzXy9n9SrXMNcYitaMLvSbYuQf/T6V2DUZkYGGd4C4nI2O58pqCb7GTK0P0iUh1gbWJ7EEXg3NMi1O9vIWkxaGxWzp5cSKgHWcfoEWEihTBpXJhIoXS1gBOBZ+3ibBORlM0MxxygrX0EIFPnx1U1HpjvUM2mnD6AsyZH0rWd1YpIpGdZ97gxhTxyRzGDB37mcyWBSPUpsN/WB8OzqQEZNU+paiowP7TjkElXq9bNsAtDi7tloYcErptsOU27dlqffYDfBvIBFpni86fWIOn7vgbGoWwCkImvERGJBObrDgIA6gImEAEGtOM5KwDss79DVDWYZu45CADYEwCgmLbW+r6sAaCq2zIaAIwO/PNWUAXbU2OTsuypRtaua+5ZCAQ++CjFomVx3t2Z/Az11/XtSuaMhr6bTSe4xfbrREQmA8/ZWP0GSi1weEcPvbM1waIVLRSEoblFmXL6QELdgPz9vSl+9bs426t83qvyueXaTmubGpA3A+PJbWumW7JpAjuBTDtqallZmXWEWg881WkHY2QBI48SkimYH2tm0bI4NZ903sBNJOH1t1q46d79bK/ybU5R2BVff8vYemlpqQDT7PwOEdmV1YaI67pLbEFUr6rjjDFVtgs03TLSIVV/mOI3j8TZuist+KHFwpmTCjjx+AKOHh4iHIa6euW93SnW/jPB1l0+qukwePWsAUw9s0utuUCiFassf6OATcAQYLHned/Opgmgqn8WkUuAYhEpays/9VmQF4EzO3ouemSYm380hCcqm6hck+CTesWsSWDWJBBJC+q3U4ojhgnXlA/ia+O6zB5fQPW5wHimFR5VfTzrLTHHcYaKyCabeW1W1VOMMXGrBVOAp0lvjnTsrXzYvivJMy+38OqGJHUNSiqQRQwaAMeNDHHOqYWcdlKEQ4q6tM4EME2iFavt6hfZOmAssFtVv2qM+TSrGmCMqXNd92HgF8AJIvINYHHak+hqfFkIXNupswnBmNEFjBldwKUzlZpan/2NPo1NEInA8GFhhg8LdVX4BGkB6bZ8hi62wgM81F3he9MUjYrIBuv1d6rqycaYfWktKC8GWQmck+O4vxrRMimJNViejhSRN4AosNc2RT/MSVPUGFOtqr+2IfEYEbm9tLQ0BCDRWL3dAtucQ+HfAWZnhHddNywid1jhFbizJ8L3GIBMPzBQd18RDodbva1tVZ8PvJgD4V+0Xv+DwNzlpA9hALzm+/6DPX1pjwEwxsRV9Xs2Bw8D97muO7UVhGhFFWgp8FsgmQXBE8C9oKXpd7eGZRe428qwD5hbWVnZlHMALAgbSO8QJYFi4E+O45zfBkKsHuF6wAVe7YPwrwBlCDdINFYf8EVlwB9t2GsBrvE8r1em1+uivaysTFT1J6S3x0NAPXCtqi4K7tdrdXkEmApSDlxgewihLkrbOhtSK0CfkWisJSB4WEQutys/xJbj81R1vjGmf7fHrRqGgOuBO2wOkAIWquotxpiaAxKpqnJBtAhC40nvLY6kbZepJp1q63qEjUCDlMS03beG2+/MtQA2q+oNwAOfywGJwKqIiMyyzjEj0A7gFmCp3bToNc2YMaMoFArNtvlH1E7vBa72PG9ZX/nP2iEp13VPBB4GTg2891/AfFsrVHue53dT6FAoFBplfcgPadtz9EmfNrvcGLM1G3xn9Zic67oDSR+T+Xm7hmkDsA7wSB+T2wM02Aar2J5jMTBCRE6xgp/MgecGdwO3qupiY0xLtnjOyUFJx3GGi8hc4AfAMR3ckrTd28ZA07XIhtX2tA243wpek21ec31UttgelS0nfVR2BN07KruD9ImPmKquzeW54X47LO26bpGqHgOMFZFjSfftD7MC11rHtl1Vt4rIzr46zzzlKU95ylOe8pSnPH0G/RcXcrnIoJZOrAAAAABJRU5ErkJggg=="><span>刷新好啦～</span></div>`,
              width: '150px',
              type: 'text',
              position: 'top'
            });
          } else {
            Vue.$vux.toast.show({
              text: `<div class="greenStyle">刷新太快了哦～</div>`,
              width: '150px',
              type: 'text',
              position: 'top'
            });
          }
        } else {
          console.error('Directive v-pull-to-refresh needs a function as value.')
        }
        el.__pullToRefresh_iconVue.loading = false;
        reset();
      },
      onInit(handler) {
        el.__pullToRefresh_iconVue = new Vue({
          components: {Spinner, Icon},
          data() {
            return {
              loading: false
            }
          },
          render(h) {
            if (!this.loading) {
              return h('icon', {
                props: {
                  type: 'circle'
                },
                style: 'font-size:21px;position:relative;top:-2px;color:#aaa;font-weight:bold'
              })
            }
            return h('spinner', {
              props: {
                type: 'ripple'
              }
            })
          }
        }).$mount('.pulltorefresh--icon')
      }
    });
  },
  unbind(el) {
    el.__pullToRefresh && el.__pullToRefresh.destroy();
  }
};

export default directive;
