import dayjs from 'dayjs'
//dayjs真的好使！！
export default function (t) {
  let moment = transferISO8601extra(t)
  // if (!moment.isValid()) {
  //   // let exp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}\+\d{4}$/
  //   // if (exp.test(t)) {
  //   //   moment = dayjs(t.replace(/\+\d{4}$/, 'Z'))
  //   // }
  //   transferISO8601extra(t)
  // }
  let now = dayjs()
  let diff = now.diff(moment, 'seconds')
  if (diff >= 60) {//超过60秒吗
    diff = now.diff(moment, 'minutes')
    if (diff >= 60) {//超过60分钟吗
      diff = now.diff(moment, 'hours')
      if (diff > 24) {//超过24小时吗
        diff = now.diff(moment, 'months')
        if (diff >= 1) {//超过1个月吗
          if (diff >= 12) {//超过12个月吗
            return `${now.diff(moment, 'years')}年前`
          } else {
            return `${diff}个月前`
          }
        } else {
          return `${now.diff(moment, 'days')}天前`
        }
      } else {
        return `${diff}小时前`
      }
    } else {
      return `${diff}分钟前`
    }
  } else {
    return `${Math.max(diff, 0)}秒前`
  }
}

export function preHandleTime(ex) {
  let t = transferISO8601extra(ex)
  if (!t.isValid()) {
    return ex
  }
  return t.format('YYYY.MM.DD HH:mm')
}

function transferISO8601extra(ex) {
  let t = dayjs(ex)
  if (!t.isValid()) {
    let exp = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})\.\d{3}\+(\d{2})(\d{2})$/
    let res = exp.exec(ex)
    if (res) {
      ex = res[1] + 'Z'
      t = dayjs(ex)
      t = t.subtract(Number(res[2]), 'hour')
      t = t.subtract(Number(res[3]), 'minute')
    }
    return t
  }
  return t
}
