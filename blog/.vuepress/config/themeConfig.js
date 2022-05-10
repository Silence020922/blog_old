module.exports = {
  hostname: 'http://shangxiaojin.xyz:8088',
  siteName: '殇晓瑾、',
  logo: 'https://surplus-1311636487.cos.ap-beijing.myqcloud.com/logo1.jpg',
  siteDesc: '一个00后的在校大学生 -- 喜爱魔[术]、数[学]、运[动]、游[戏]的新人。（拥有一个喜欢在[斗地主]里破产的女朋友）',
  nav: [
    { text: '🏠 Home', link: '/' },
    { text: '📖 Poem', link: '/categories/poem/' },
    { text: '🤝 Share', link: '/categories/share/' },
    { text: '🔥 About me', link: '/about-me/' },
    { text: '📽 Old Time', link: '/categories/oldtime/' },
    { text: '🔗 friend-links', link: '/friend-links/' },
  ],
  searchPlaceholder: 'Search',
  searchMaxSuggestions: 10,
  social: [
    {
      type: 'email',
      link: '201917090004@mail.sdu.edu.cn'
    },
    {
      type: 'github',
      link: 'https://github.com/Silence020922'
    },
    {
      type: 'qq',
      link: 'tencent://AddContact/?fromId=45&fromSubId=1&subcmd=all&uin=1367896482&website=www.oicqzone.com'
    },
    // {
    //   type: 'feed',
    //   link: '/rss.xml'
    // }
  ],
  // themeConfig: {
  //   // lastUpdated: 'Last Updated', // string | boolean
  //   hostname: 'http://shangxiaojin.xyz:8088/'
  // },
  reward: {
    text: 'Buy me a cup of coffee ☕.',
    // 是否启用
    enable: true,
    ways: [
      {
        name: 'wechat',
        icon: 'wechat',
        qrcode: 'https://surplus-1311636487.cos.ap-beijing.myqcloud.com/wechat.png',
        text: 'This is a Wechat Pay qrcode',
        color: 'rgb(9, 187, 7)'
      }
    ]
  },
  copyright: '',
  blog: {
    directories: [
      {
        id: 'post',
        dirname: '_post',
        path: '/',
        itemPermalink: '/post/:year/:month/:day/:slug.html',
        frontmatter: { title: '' },
        pagination: {
          perPagePosts: 10,
          prevText: '',
          nextText: ''
        },
      }
    ],
    frontmatters: [
      {
        id: "tag",
        keys: ['tag', 'tags'],
        path: '/tags/',
        frontmatter: { title: 'Tag' },
        pagination: {
          lengthPerPage: 10,
          prevText: '',
          nextText: ''
        }
      },
      {
        id: "category",
        keys: ['category', 'categories'],
        path: '/categories/',
        frontmatter: { title: 'Category' },
        pagination: {
          lengthPerPage: 10,
          prevText: '',
          nextText: ''
        }
      }
    ],
    sitemap: {
      hostname: 'http://shangxiaojin.xyz:8088',
      exclude: ['/404.html']
    },
    feed: {
      canonical_base: '',
    },

  }
}
