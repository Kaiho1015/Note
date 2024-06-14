import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Kaiho\'s Note',
  tagline: 'Let life be beautiful like summer flowers and death like autumn leaves. -- Tagore',
  favicon: 'img/logo.jpg',
  scripts: [
    {
      src: "https://umami.qhp.us/script.js",
      defer: true,
      'data-website-id': "471b3c74-5054-4b03-bbb0-1f379b60c917"
    }
  ],
  themes: ['@docusaurus/theme-live-codeblock'],
  // Set the production url of your site here
  url: 'https://www.qhp.us',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'QHP1015', // Usually your GitHub org/user name.
  projectName: 'Note', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh'],
  },

  // plugins
  plugins: [
    'docusaurus-plugin-sass'
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs',
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.scss',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    navbar: {
      title: 'Kaiho',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.jpg',
      },
      items: [
        {
          type: 'dropdown',
          sidebarId: 'languageSidebar',
          position: 'left',
          label: '编程语言',
          items: [
            {
              type: 'doc',
              label: 'Python',
              docId: '/category/python'
            }
          ]
        },
        {
          href: 'https://github.com/QHP1015',
          className: "header-github-link",
          position: 'right',
        },
      ],
    },

    // algolia: {
    //   appId: 'GV6YN1ODMO',
    //   apiKey: '50303937b0e4630bec4a20a14e3b7872',
    //   indexName: 'kuizuo',
    // },

    prism: {
      theme: prismThemes.vsLight,
      darkTheme: prismThemes.vsDark,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
