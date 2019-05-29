const qs = require("querystring");

console.log("http://translate.google.com/translate_tts?" + qs.stringify({
  client: "tw-ob",
  tl: "zh-CN",
  q: "你好"
}));
