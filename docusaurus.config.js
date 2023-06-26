// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Kaiho',
  tagline: 'Let life be beautiful like summer flowers and death like autumn leaves. -- Tagore',
  url: 'https://www.qianhaipeng.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logo.jpg',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Kaiho', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // 插件
  plugins: ['docusaurus-plugin-sass'],

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/', // 把文档放在网站根部
          sidebarPath: require.resolve('./sidebars.ts'),
          include: ["**/*.md", "**/*.mdx"],
          exclude: [
            "**/_*.{js,jsx,ts,tsx,md,mdx}",
            "**/_*/**",
            "**/*.test.{js,jsx,ts,tsx}",
            "**/__tests__/**",
          ],
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: false,
        theme: {
          customCss: [require.resolve('./src/css/custom.scss')],
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Kaiho',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.jpg',
          style:{borderRadius:'50%'}
        },
        items: [
          {
            type:'dropdown', 
            label: 'Language',
            position: 'left',
            items:[
              {
                type:'doc',
                label:'JavaScript',
                docId:'Language/JavaScript/JS词法结构'
              },
              {
                type:'doc',
                label:'TypeScript',
                docId:'Language/TypeScript/TypeScript基础'
              },

            ]
          },
          {
            type:'dropdown', 
            label: 'Network',
            position: 'left',
            items:[
              {
                type:'doc',
                label:'计算机网络',
                docId:'Network/计算机网络/计算机网络和因特网'
              }
            ]
          },
          {
            type:'dropdown', 
            label: 'Graphics',
            position: 'left',
            items:[
              {
                type:'doc',
                label:'Three.js',
                docId:'Graphics/Three.js/Three.js基础'
              }
            ]
          },
          {
            className: "header-github-link",
            href: 'https://github.com/QHP1015',
            position: 'right',
          },
        ],
      },
      // footer: {
      //   style: 'dark',
      //   links: [
      //     {
      //       title: 'Docs',
      //       items: [
      //         {
      //           label: 'Tutorial',
      //           to: '/docs/intro',
      //         },
      //       ],
      //     },
      //     {
      //       title: 'Community',
      //       items: [
      //         {
      //           label: 'Stack Overflow',
      //           href: 'https://stackoverflow.com/questions/tagged/docusaurus',
      //         },
      //         {
      //           label: 'Discord',
      //           href: 'https://discordapp.com/invite/docusaurus',
      //         },
      //         {
      //           label: 'Twitter',
      //           href: 'https://twitter.com/docusaurus',
      //         },
      //       ],
      //     },
      //     {
      //       title: 'More',
      //       items: [
      //         {
      //           label: 'Blog',
      //           href: 'https://qhp.us',
      //         },
      //         {
      //           label: 'GitHub',
      //           href: 'https://github.com/QHP1015',
      //         },
      //       ],
      //     },
      //   ],
      //   copyright: `Copyright © ${new Date().getFullYear()} QHP\'s Note.`,
      // },
      prism: {
        // theme: lightCodeTheme,
        // darkTheme: darkCodeTheme,
        theme: require('prism-react-renderer/themes/vsDark'),
      },
      docs:{
        sidebar: {
          // hideable: true,
          autoCollapseCategories: true,
        }
      },
      algolia: {
        // Algolia 提供的应用 ID
        appId: 'JVHZ8FHB9I',
        //  公开 API 密钥：提交它没有危险
        apiKey: 'bf816047486a86b1bb3ca0419720d919',
        indexName: 'Kaiho-note',
        // 可选：见下文
        contextualSearch: true,
  
        // 可选：声明哪些域名需要用 window.location 型的导航而不是 history.push。 适用于 Algolia 配置会爬取多个文档站点，而我们想要用 window.location.href 在它们之间跳转时。
        externalUrlRegex: 'external\\.com|domain\\.com',
  
        // 可选：Algolia 搜索参数
        searchParameters: {},
  
        // 可选：搜索页面的路径，默认启用（可以用 `false` 禁用）
        searchPagePath: 'search',
    },
  })
};

module.exports = config;
