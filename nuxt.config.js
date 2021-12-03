import theme from '@nuxt/content-theme-docs'

export default theme({
  loading: { color: '#5A0FC8' },
  pwa: {
    manifest: {
      name: '京大保健診療所の存続を求める会'
    }
  },
  i18n: {
    locales: () => [ {
      code: 'ja',
      iso: 'ja-JP',
      file: 'ja-JP.js',
      name: '日本語'
    }, {
      code: 'en',
      iso: 'en-US',
      file: 'en-US.js',
      name: 'English'
    }],
    defaultLocale: 'ja'
  },
})
