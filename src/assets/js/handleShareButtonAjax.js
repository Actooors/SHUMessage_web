import axios from 'axios'

export function handleLikeAjax(info) {
  axios({
    url: "",
    method: "post",
    data: info
  }).then((res) => {

  }).catch((err) => {

  })
}
