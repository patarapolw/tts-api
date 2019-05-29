# TTS (text-to-speech) API

Based on [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API#Speech_synthesis)

## Calling the API via GET requests

The URL accepts four parameters

- q: Text to speak
- lang: Language
- speaker: Speaker's name
- rate: Speaking speed

All parameters can be left out.

For example, <https://patarapolw.github.io/tts-api/?q=こんにちは&lang=ja-JP>

## Usage in your website

Web Speech API is very simple, as simple as

```js
const u = new window.SpeechSynthesisUtterance(TEXT_TO_SPEAK)
u.lang = TEXT_LANGUAGE;
u.setSpeakerName = TEXT_SPEAKER;
u.rate = TEXT_SPEED;
window.speechSynthesis.speak(u);
```

However, [web browsers' support varies](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API#SpeechSynthesis).

## Why?

[online tts - Google Search](http://lmgtfy.com/?q=online+tts) doesn't fullfill my needs. The search result is full of people trying to sell things.

## Known bugs

Doesn't speak Chinese on Android Chrome. I set up another project (<https://github.com/patarapolw/zhres#get-apitts>) for the time being.
