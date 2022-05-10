module.exports = {
  title: '殇晓瑾、',
  description: '一个00后的在校大学生 -- 喜爱魔[术]、数[学]、运[动]、游[戏]的新人（拥有一个喜欢在[斗地主]里破产的女朋友）',
  port: 8088,
  markdown: {
    lineNumbers: true,
    extractHeaders: [ 'h2', 'h3', 'h4' ],
    plugins: {
      'markdown-it-mark': true,
      'markdown-it-footnote': true,
      'markdown-it-abbr': true,
      'markdown-it-task-lists': true
    }
  },

  theme: require.resolve('../../index'), // 使用本地主题
  themeConfig: require('./config/themeConfig')
}
//侧栏介绍