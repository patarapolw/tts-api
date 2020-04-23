<template lang="pug">
main.container(style="margin-top: 1rem;")
  form
    .field
      textarea.textarea(placeholder="Please type what you want to be spoken here." name="q" :value="q")
    .field
      label.label(for="lang") Language
      .control
        .select
          select(name="lang" :key="langKey" :value="lang")
            option(v-for="[v, name] in Object.entries(languages).sort()"
              :key="v" :value="v") {{name}}
    .field
      button.button(type="submit") Submit
  hr
  section
    .field
      button.button.is-success(@click="speak") Play with Browser's engine
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { langGtts } from './util/lang'

@Component
export default class App extends Vue {
  languages: Record<string, string> = {}
  langKey = ''

  get q () {
    const { searchParams } = new URL(location.href)
    return searchParams.get('q')
  }

  get lang () {
    const { searchParams } = new URL(location.href)
    return searchParams.get('lang')
  }

  created () {
    speechSynthesis.getVoices().map(v => {
      const lang = v.lang
      this.languages[lang] = lang
    })

    speechSynthesis.onvoiceschanged = (ev) => {
      speechSynthesis.getVoices().map(v => {
        const lang = v.lang
        this.languages[lang] = lang
      })

      const normalizeLang = (lang: string) => {
        return lang.toLocaleLowerCase().replace(/[-_]/g, '-')
      }

      langGtts.trim().split('\n').map(ln => ln.split(':'))
        .map(([k, v]) => {
          const normK = normalizeLang(k)
          k = Object.keys(this.languages).filter(k0 => normalizeLang(k0) === normK)[0] || k
          this.languages[k] = v
        })
      this.langKey = '1'
    }
  }

  speak () {
    if (this.q && this.lang) {
      const u = new SpeechSynthesisUtterance(this.q)
      u.lang = this.lang
      speechSynthesis.speak(u)
    }
  }
}
</script>
