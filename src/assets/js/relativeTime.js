import dayjs from 'dayjs'
//dayjs真的好使！！
export default function (t) {
  let moment = dayjs(t)
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
