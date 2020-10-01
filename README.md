# SHU Message This is For Boy and Girl. 
一个良心的校园消息聚合、分享及交流平台。

> 我们将长期致力于打造一个好看的，好用的，稳定的，且仅为SHU师生服务的消息聚合及分享平台。

> 我们要做的是，将散落在学校不同网站上的消息聚合到本平台上，让用户及时且完全地浏览到自己关注的消息。如志愿活动信息、留学信息、保研信息等。并为用户提供发表动态的功能作为新闻和消息的补充，用户可以自由地在平台上进行交流。

## 项目介绍
目前项目的UI是仿照即刻APP进行设计的，项目结构上，components不涉及业务逻辑。项目尽量增加代码复用率，在不违背原则的基础上降低逻辑复杂度。

技术栈 `ES6` `vue` `vuex` `vux-ui` `scss` `webpack`

后端传送门：[SHU_Message_Service](https://github.com/Actooors/SHU_Message_Service)
爬虫传送门：[SHUMessage-Scrapy](https://github.com/Actooors/SHUMessage-Scrapy)

![](https://ws1.sinaimg.cn/large/006P5HMAgy1g224wou96ej30vi3a4hbv.jpg)

### Before Build

``` bash
# install pnpm
npm i -g pnpm
```

### Build Setup

``` bash
# install dependencies
pnpm install

# serve with hot reload at localhost:8080
pnpm run dev

# build for production with minification
pnpm run build

# build for production and view the bundle analyzer report
pnpm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
