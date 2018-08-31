import axios from 'axios'

export function handleLikeAjax(info, like) {
  let ret = ""
  axios({
    url: apiRoot + "/common/like",
    method: "post",
    data: {
      ...info,
      like: like//false为取消点赞
    }
  }).then((res) => {
    if (res.data.code === "FAILED") {
      ret = res.data.message
    }
  }).catch((err) => {
    ret = err.toString()
  })
  return ret
}
