const regexpUnicode16 = XRegExp(`\\pS`, 'Ag');

function emojiEncode(txt) {
  console.log(txt)
  if (!regexpUnicode16.test(txt)) {
    console.log("txt", txt)
    return txt
  }
  return txt.replace(regexpUnicode16, (c) => {
    if (c.length === 2) {
      const code = (c.charCodeAt(0) - 0xD800) * 0x400 + 0x10000 + (c.charCodeAt(1) - 0xDC00); // 转换算法
      return "&#" + code + ";";
    }
    return c
  });
}

function emojiDecode(txt) {
  const regex = /&#(\d)+;/g;
  if (!regex.test(txt)) {
    return txt
  }
  return txt.replace(regex, (str) => {
    let num = parseInt(str.substring(2, str.length - 1)) - 0x10000
    return String.fromCharCode(Math.floor(num / 0x400) + 0xD800) + String.fromCharCode(num % 0x0400 + 0xDC00)
  })
}

export {emojiEncode, emojiDecode}
