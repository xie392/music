
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // Vant 配置
  // "plugins": [
  //   ["import", {
  //     "libraryName": "vant",
  //     "libraryDirectory": "es",
  //     "style": true
  //   }]
  // ],
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}

